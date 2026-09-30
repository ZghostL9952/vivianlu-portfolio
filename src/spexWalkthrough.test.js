import test from 'node:test'
import assert from 'node:assert/strict'
import { cursorAt, frameAt, typed, walkthroughDuration, walkthroughFlows, walkthroughStages } from './spexWalkthroughTimeline.js'

test('the walkthrough follows the supplied screen order and retains account details after terms', () => {
  assert.deepEqual(walkthroughStages.map(({ id }) => id), ['splash', 'birthday', 'account', 'terms', 'accepted', 'verification', 'roles', 'sports'])
  for (const stage of walkthroughStages) {
    assert.equal(frameAt(stage.start).stage.id, stage.id)
    assert.equal(frameAt(stage.start + stage.duration - 1).stage.id, stage.id)
    assert.ok(stage.clicks.every(([time, x, y]) => time < stage.duration && x >= 0 && x <= 390 && y >= 0 && y <= 844))
  }
  assert.equal(frameAt(walkthroughDuration).complete, true)
  assert.equal(frameAt(walkthroughDuration + 1000).stage.id, 'sports')
})

test('roles start unselected, explore other choices, and end with only Athlete', () => {
  const start = walkthroughStages.find(({ id }) => id === 'roles').start
  const moments = [0, 900, 1900, 2900, 3900, 4900, 5900, 6900, 8500]
  assert.deepEqual(moments.map((time) => frameAt(start + time).role), [null, 'coach', null, 'parent', null, 'community', null, 'athlete', 'athlete'])
})

test('sport chips start neutral and are selected in cursor order', () => {
  const start = walkthroughStages.find(({ id }) => id === 'sports').start
  assert.equal(frameAt(start).baseball, false)
  assert.equal(frameAt(start).cycling, false)
  assert.equal(frameAt(start + 1000).baseball, true)
  assert.equal(frameAt(start + 1000).cycling, false)
  assert.equal(frameAt(start + 2600).cycling, true)
})

test('typing progresses and each tap lands precisely on its target', () => {
  assert.equal(typed('2004', 500, 1000, 1000), '')
  assert.equal(typed('2004', 1500, 1000, 1000), '20')
  assert.equal(typed('2004', 3000, 1000, 1000), '2004')
  for (const stage of walkthroughStages) {
    for (const [time, x, y] of stage.clicks) {
      const atTap = cursorAt(stage, time)
      assert.deepEqual(atTap, { x, y, pulse: 0 })
      const beforeTap = cursorAt(stage, time - 1)
      assert.ok(Math.abs(beforeTap.x - x) < .1 && Math.abs(beforeTap.y - y) < .1)
    }
  }
})


test('teen account overlays track the supplied layout, including consent and continue', () => {
  const teen = walkthroughFlows['13–17']
  const account = teen.stages.find(({ id }) => id === 'account')
  const accepted = teen.stages.find(({ id }) => id === 'accepted')
  assert.equal(account.asset, 'TeenAccount')
  assert.equal(accepted.asset, 'TeenAccount')
  assert.deepEqual(account.clicks[0], [500, 95, 307])
  assert.deepEqual(account.clicks.at(-1), [8500, 28, 671])
  assert.deepEqual(accepted.clicks[0], [1050, 195, 733])
  assert.equal(teen.accountOffset, 68)
  assert.equal(teen.checkboxOffset, 48)
})

test('teen roles offer only Community member and Athlete, starting with neither selected', () => {
  const teen = walkthroughFlows['13–17']
  const stage = teen.stages.find(({ id }) => id === 'roles')
  assert.equal(stage.asset, 'TeenRoles-neutral')
  assert.deepEqual([0, 900, 2300, 3600, 5000].map((t) => frameAt(stage.start + t, teen).role), [null, 'community', null, 'athlete', 'athlete'])
  assert.equal(teen.assets.includes('role-coach'), false)
  assert.equal(teen.assets.includes('role-parent'), false)
})

test('under-13 birthday branches directly to a parent request and ends at confirmation', () => {
  const child = walkthroughFlows['Under 13']
  assert.deepEqual(child.stages.map(({ id }) => id), ['splash', 'birthday', 'parent', 'request-sent'])
  assert.equal(frameAt(7800, child).stage.asset, 'Under13Link')
  assert.equal(frameAt(13000, child).stage.asset, 'Under13Sent')
  assert.equal(frameAt(child.duration, child).stage.id, 'request-sent')
  assert.equal(frameAt(child.duration, child).complete, true)
  assert.equal(child.chapters.length, 4)
})

test('all age paths have valid stage boundaries, age samples, and cursor targets', () => {
  const year = new Date().getFullYear()
  assert.equal(year - Number(walkthroughFlows['13–17'].birthdayYear), 15)
  assert.equal(year - Number(walkthroughFlows['Under 13'].birthdayYear), 10)
  for (const flow of Object.values(walkthroughFlows)) {
    for (const stage of flow.stages) {
      assert.equal(frameAt(stage.start, flow).stage.id, stage.id)
      assert.equal(frameAt(stage.start + stage.duration - 1, flow).stage.id, stage.id)
      assert.ok(stage.chapter < flow.chapters.length)
      for (const [time, x, y] of stage.clicks) {
        assert.ok(time < stage.duration && x >= 0 && x <= 390 && y >= 0 && y <= 844)
        assert.deepEqual(cursorAt(stage, time), { x, y, pulse: 0 })
      }
    }
  }
})
