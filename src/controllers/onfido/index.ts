import { Request, Response } from 'express'

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.BASE_URL
const apiToken = process.env.API_TOKEN
const workflowId = process.env.WORKFLOW_ID

const a = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Token token=${apiToken}`,
    "Content-Type": 'application/json',
    Accept: 'application/json'
  }
})

export const getSDKToken = async (req: Request, res: Response) => {
  const userId = req.body.applicant_id

  if (userId && userId.trim() !== '') {
    try {
      const req = await a.post(
        '/sdk_token',
        JSON.stringify({
          applicant_id: userId,
          application_id: '*'
        })
      )
      const data = req.data
      res.status(200).json({ token: data.token })

    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json({
      success: false,
      error: { message: 'Applicant ID not provided' }
    })
  }
}

export const getWorkflowRunId = async (req: Request, res: Response) => {
  const userId = req.body.applicant_id

  if (userId && userId.trim() !== '') {
    try {
      const info = await a.post(
        '/workflow_runs',
        JSON.stringify({
          applicant_id: userId,
          workflow_id: workflowId
        })
      )
      const data = info.data
      res.status(200).json({ id: data.id })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid token' },
        ae: error
      })
    }
  } else {
    res.status(400).json({
      success: false,
      error: { message: 'Invalid user' }
    })
  }
}