import * as fs from 'fs'
import * as path from 'path'
import { BASE_API_URL } from '../utils/constant';

import films from '../data/data.json'

export async function getAllFilms() {
    const response = await fetch(`${BASE_API_URL}/getFilms`)
    const data = await response.json()
  return data
}