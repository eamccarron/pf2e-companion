import type { Character } from "@/types/Character"
import { faker } from "@faker-js/faker";

export const createCharacter = (): Character => ({
  name: faker.person.firstName(),
  ancestry: faker.helpers.arrayElement(['dwarf', 'elf', 'gnome', 'goblin', 'halfling', 'human']),
  heritage: faker.helpers.arrayElement(['ancient-bones', 'charhide', 'charnomicon', 'deep-earths', 'forge', 'rock', 'strong-blood', 'whisperer']),
  background: faker.helpers.arrayElement(['acolyte', 'charlatan', 'criminal', 'entertainer', 'gladiator', 'hermit', 'hunter', 'nomad', 'sage', 'sailor', 'scavenger', 'scout', 'tinkerer', 'warrior']),
  class: faker.helpers.arrayElement(['alchemist', 'barbarian', 'bard', 'champion', 'cleric', 'druid', 'fighter', 'investigator', 'monk', 'oracle', 'ranger', 'rogue', 'sorcerer', 'swashbuckler', 'witch', 'wizard']),
  abilityScores: {
    str: faker.number.int({ min: 8, max: 18 }),
    dex: faker.number.int({ min: 8, max: 18 }),
    con: faker.number.int({ min: 8, max: 18 }),
    int: faker.number.int({ min: 8, max: 18 }),
    wis: faker.number.int({ min: 8, max: 18 }),
    cha: faker.number.int({ min: 8, max: 18 }),
  },
});

export const createCharacters = (): Array<Character> => (
  faker.helpers.multiple<Character>(createCharacter, { count: faker.number.int({ min: 5, max: 12 }) })
);
