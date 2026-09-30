"""Derive neutral and selected states from the supplied SVG outlines.

Run after replacing the seven original exports in public/spex.
Original exports stay intact; generated artwork retains their exact geometry.
"""
from copy import deepcopy
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'spex'
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)


def save(root, name):
    ET.ElementTree(root).write(ROOT / name, encoding='unicode')


def layer(source, elements, name):
    root = ET.Element(f'{{{NS}}}svg', source.attrib)
    for element in elements:
        root.append(deepcopy(element))
    for element in source:
        if element.tag == f'{{{NS}}}defs':
            root.append(deepcopy(element))
    save(root, name)


roles = ET.parse(ROOT / 'RoleSelection.svg').getroot()
neutral = deepcopy(roles)
neutral[18].set('fill', 'white')
for element in list(neutral)[19:24]:
    for node in element.iter():
        for attribute in ('fill', 'stroke'):
            if node.get(attribute) == 'white':
                node.set(attribute, '#003057')
neutral[23].set('fill', '#5B5B5B')
save(neutral, 'RoleSelection-neutral.svg')
for name, start, end in [('athlete', 18, 24), ('coach', 24, 30), ('parent', 30, 34), ('community', 37, 43)]:
    elements = deepcopy(list(roles)[start:end])
    if name != 'athlete':
        elements[0].set('fill', '#003057')
        for element in elements[1:]:
            for node in element.iter():
                for attribute in ('fill', 'stroke'):
                    if node.get(attribute) in ('#003057', '#5B5B5B'):
                        node.set(attribute, 'white')
    layer(roles, elements, f'role-{name}.svg')

sports = ET.parse(ROOT / 'SportsChips.svg').getroot()
neutral = deepcopy(sports)
for name, index in [('baseball', 4), ('cycling', 24)]:
    group = neutral[23]
    group[index].set('fill', '#FBFBFB')
    group[index].set('stroke', '#003057')
    group[index].set('stroke-width', '1.5')
    group[index + 1].set('fill', '#003057')
    layer(sports, list(sports[23])[index:index + 2], f'sport-{name}.svg')
save(neutral, 'SportsChips-neutral.svg')

# Teen registration offers only Athlete and Community member.
# Collapse the removed Coach and Parent cards while preserving original artwork.
neutral_roles = ET.parse(ROOT / 'RoleSelection-neutral.svg').getroot()
teen_roles = ET.Element(f'{{{NS}}}svg', neutral_roles.attrib)
for element in list(neutral_roles)[:24]:
    teen_roles.append(deepcopy(element))
remaining = ET.SubElement(teen_roles, f'{{{NS}}}g', {'transform': 'translate(0 -192)'})
for element in list(neutral_roles)[34:47]:
    remaining.append(deepcopy(element))
for element in list(neutral_roles)[47:]:
    teen_roles.append(deepcopy(element))
save(teen_roles, 'TeenRoles-neutral.svg')
