
const Restaurant = require('../models/restaurant');
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

describe('Restaurant Add', ()=>{
    // the code below is for insert testing
    it('Add product testing', () => {
        const restaurant = {
            'RestaurantName': 'Awesome',
            'Logo': 'asd.png',
            'Tags':'MultiCuisine',
            'Location':'Bafal',
            'Delivery':'10am to 10pm',
            'Categoryid':'12'
        };

        return Restaurant.create(restaurant)
            .then((pro_ret) => {
                expect(pro_ret.RestaurantName).toEqual('Awesome');
            });
    });

    it('to test the update', async () => {
        return Restaurant.findOneAndUpdate({_id :Object('5e48ef6bb706075b0c87f7c1')}, {$set : {RestaurantName:'Amazing'}})
            .then((pp)=>{
                expect(pp.RestaurantName).toEqual('Amazing')
            })

    });

    // the code below is for delete testing
    it('to test the delete book is working or not', async () => {
        const status = await Restaurant.deleteMany();
        expect(status.ok).toBe(1);
    });
})