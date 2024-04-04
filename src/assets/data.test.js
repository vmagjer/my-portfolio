import { expect, test } from 'vitest'
import data from './data'

test('all tech tags are in tech categories or techs', () => {
  const allCategories = Object.keys(data.technologyCategories)
  const allTags = Object.values(data.technologies).reduce(
    (acc, tech) => acc.concat(tech.tags),
    []
  )

  const tagsNotInCategories = allTags
    .filter((tag) => !allCategories.includes(tag))
    .filter((tag) => !Object.keys(data.technologies).includes(tag))
  expect(tagsNotInCategories).toEqual([])
})
