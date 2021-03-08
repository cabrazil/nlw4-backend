import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";


class AnswerController {
// http://localhost:3333/answers/1?=u13525e65-1c25-4797-ab0e-0d1060d92f30
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if(!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);

  }
}

export { AnswerController };