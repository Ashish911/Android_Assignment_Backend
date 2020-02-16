
const User = require('../models/user');
const mongoose = require ('mongoose');

const url = 'mongodb://localhost:27017/FoodStation_Test';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User  Schema testing', () => {
    // the code below is for insert testing
        it('Add user testing anything', () => {
            const user = {
                'FullName': 'asd',
                'UserName': 'afsf',
                'Email':'lklk@gmail.com',
                'PhoneNo':'58646543',
                'Password':'123123123'
            };
            
            return User.create(user)
                .then((user_ret) => {
                    expect(user_ret.Email).toEqual('lklk@gmail.com');
                });
        });
    // the code below is for delete testing
        it('to test the delete user is working or not', async () => {
            const status = await User.deleteMany();
            expect(status.ok).toBe(1);
        });
    
    // it('to test the update', async () => {
    //
    //     await User.findOneAndUpdate({ _id :Object('5e392b369325913298c0d4fc')}, {$set : {Email:'klk@gmail.com'}})
    //     .then((ema)=>{
    //         expect(ema.Email).toEqual('klk@gmail.com')
    //     })
    //
    // });
})        