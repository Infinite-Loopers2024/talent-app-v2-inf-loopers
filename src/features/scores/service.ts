import { Db } from "@/db";
import { createRepository } from "./repository";




export const createService = (db: Db ) => {
 const repository = createRepository(db)
  return {
    getDeveloperScoreById: async () => {
      try {
      const developerScore = await repository.getById()
      
      const programmingScore = (developerScore[0].frontend + developerScore[0].backend) / 2;
      const planningScore = (developerScore[0].management + developerScore[0].design) / 2;
      const communicationScore = (developerScore[0].individualCommunication + developerScore[0].teamCollaboration) / 2;
      const averageScore = Math.round((programmingScore + planningScore + communicationScore) / 3);

      return {
        frontend: Math.round(developerScore[0].frontend),
        backend: Math.round(developerScore[0].backend),
        individualCommunication: Math.round(developerScore[0].individualCommunication),
        teamCollaboration: Math.round(developerScore[0].teamCollaboration),
        design: Math.round(developerScore[0].design),
        management: Math.round(developerScore[0].management),
        programmingScore: Math.round(programmingScore),
        planningScore: Math.round(planningScore),
        communicationScore: Math.round(communicationScore),
        averageScore,
      }
    } catch (error) {
      console.log(error)
      return {
        frontend: 0,
        backend: 0,
        individualCommunication: 0,
        teamCollaboration: 0,
        design: 0,
        management: 0,
        programmingScore: 0,
        planningScore: 0,
        communicationScore: 0,
        averageScore: 0,
      };
    }
    },
  }
}
