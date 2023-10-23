type AbilityScore = Partial<{
  value: number;
  modifier: number;
}>;

type Skill = Partial<{
  name: string;
  modifier: number;
  proficiency: 'untrained' | 'trained' | 'expert' | 'master' | 'legendary';
}>;

export type Character = Partial<{
  name: string;
  ancestry: string;
  heritage: string;
  background: string;
  class: string;
  level: number;
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  skills: {
    acrobatics: Skill;
    arcana: Skill;
    athletics: Skill;
    crafting: Skill;
    deception: Skill;
    diplomacy: Skill;
    intimidation: Skill;
    medicine: Skill;
    nature: Skill;
    occultism: Skill;
    performance: Skill;
    religion: Skill;
    society: Skill;
    stealth: Skill;
    survival: Skill;
    thievery: Skill;
  };
  hitPoints: {
    current: number;
    max: number;
    temp?: number;
  };
  armorClass: number;
  perception: number;
  speed: number;
  languages: string[];
  items: string[];
}>;
