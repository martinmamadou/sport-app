export interface Exercice{
  name:string;
  description:string;
  duration:number; 
}

export interface Session{
  date: Date;
  exercices:Exercice[];
  completed:boolean;
}

export const exercices:Exercice[]=[
  {
    name:'push up',
    description:'Description de l\'exercice 1',
    duration:10
  },
  {
    name:'pull up',
    description:'Description de l\'exercice 1',
    duration:10
  },
  {
    name:'squat',
    description:'Description de l\'exercice 1',
    duration:10
  },
  {
    name: 'plank',
    description:'description de l\'exercice 1',
    duration:10
  },
  {
    name: 'sit up',
    description:'description de l\'exercice 1',
    duration:10
  },
  {
    name: 'burpee',
    description:'description de l\'exercice 1',
    duration:10
  },
  
]
