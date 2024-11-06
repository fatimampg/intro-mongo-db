import User from '../user.js';

describe('User model', () => {

  test('first name must be required', async () => {
    expect.assertions(1)

    try {
      await User.create({
        lastName: 'Williams',
        email: 'sasha@gmail.com'
      })
    } catch (e) {
      expect(e).toBeTruthy()
    }    
  })
  test('last name must be required', async () => {
    expect.assertions(1)

    try {
      await User.create({
        firstName: 'Williams',
        email: 'sasha@gmail.com'
      })
      console.log("user added")
    } catch (e) {
      expect(e).toBeTruthy()
    }    
  })
  test('email must be required', async () => {
    expect.assertions(1)

    try {
      await User.create({
        lastName: 'Williams',
        firstName: 'Sasha'
      })
    } catch (e) {
      expect(e).toBeTruthy()
    }    
  })

  test('email must be unique', async () => {
    expect.assertions(1)

    try {
      await User.createIndexes();
      await User.create(
        {
          lastName: 'Williams',
          firstName: 'Sasha',
          email: 'email@gmail.com'
        })
      console.log("1st user created")
      await User.create(
        {
          lastName: 'Haas',
          firstName: 'Mel',
          email: 'email@gmail.com'
        })
        console.log("attempt to create 2nd user with same email")
    } catch (e) {
      expect(e).toBeTruthy()
    }    
  })

  test('betaUser should default to false', async () => {
    const user = await User.create({
      firstName: 'Tilly',
      lastName: 'Mills',
      email: 'tg@gmail.com'
    })

    expect(user.betaUser).toBe(false)
  })

  test('should have correct fields', async () => {
    const now = Date.now()
    const {_id, __v, ...user} = (await User.create({
      firstName: 'Tilly',
      lastName: 'Mills',
      email: 'tg@gmail.com',
      birthDate: now, 
      address: {
        street: 'Heming way',
        houseNumber: 1234,
        zip: 91917,
        city: 'SF',
        State: 'CA'
      },
      pets: ['tido', 'miguel']
    })).toObject()

    expect(user).toEqual({
      firstName: 'Tilly',
      lastName: 'Mills',
      email: 'tg@gmail.com',
      birthDate: new Date(now),
      betaUser: false,
      address: {
        street: 'Heming way',
        houseNumber: 1234,
        zip: 91917,
        city: 'SF',
        State: 'CA'
      },
      pets: ['tido', 'miguel']
    })
  })
})