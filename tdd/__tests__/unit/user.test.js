const bcript =  require('bcryptjs')
const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate')

describe('Authentication', () => {
    beforeEach(async() =>{
        await truncate();
    })

    it('should encript password', async ()=>{
        const user =  await User.create({
            name: 'Junior',
            email: "junior@mail.com",
            password: "sldkfjnsdkfn"
        });

        const compareHash = await bcript.compare("sldkfjnsdkfn", user.password_hash);

        expect(compareHash).toBe(true);

    })

})