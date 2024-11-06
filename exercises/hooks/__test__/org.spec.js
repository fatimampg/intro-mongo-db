import Project from '../project.js';
import Org from '../org.js';
import mongoose from 'mongoose';

describe('Org model', () => {
  test('removes projects when org is remove', async () => {
    const org = await Org.create({name: 'org'})
    await Project.create([
      {name: 'project1', org: org.id},
      {name: 'project', org: org.id}
    ])
    
    await org.remove()
    const matchedProjects = await Project.find({org: org._id}).exec()
    expect(matchedProjects).toHaveLength(0)
  })
})
