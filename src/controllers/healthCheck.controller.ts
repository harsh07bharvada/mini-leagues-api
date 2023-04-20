import { Request, Response } from "express";

export default {
  /**
   *
   * @param request
   * @param response
   * @returns
   */
  ok: function (request: Request, response: Response) {
    return response.status(200).send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    });
  },
};
