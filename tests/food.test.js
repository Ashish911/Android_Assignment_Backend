
const Food = require('../models/food');
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

describe('Food Add', ()=>{
    // the code below is for insert testing
    it('Add product testing', () => {
        const food = {
            'FoodName': 'Burger',
            'FoodImage': 'asd',
            'Price':'123',
            'Restaurantid':'12'
        };

        return Food.create(food)
            .then((pro_ret) => {
                expect(pro_ret.FoodName).toEqual('Burger');
            });
    });

    it('to test the update', async () => {
        return Food.findOneAndUpdate({_id :Object('5e48ef6bb706075b0c87f7c1')}, {$set : {FoodName:'pizza'}})
            .then((pp)=>{
                expect(pp.FoodName).toEqual('pizza')
            })

    });

    // the code below is for delete testing
    it('to test the delete book is working or not', async () => {
        const status = await Food.deleteMany();
        expect(status.ok).toBe(1);
    });
})