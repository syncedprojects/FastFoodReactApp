const initialState = {
    products: [
        {
            id: '1001',
            name: 'Курица гриль',
            img: './img/grill.jpg',
            price: '31000',
        },
        {
            id: '1002',
            name: 'Лаваш',
            img: './img/lavash.jpg',
            price: '14000',
        },
        {
            id: '1003',
            name: 'Гамбургер',
            img: './img/gamburger.jpg',
            price: '13500',
        },
        {
            id: '1004',
            name: 'Чизбургер',
            img: './img/chizburger.jpg',
            price: '15500',
        },
        {
            id: '1005',
            name: 'Бигбургер',
            img: './img/bigburger.jpg',
            price: '22000',
        },
        {
            id: '1006',
            name: 'Чикенчиз',
            img: './img/chikenchiz.jpg',
            price: '13500',
        },
        {
            id: '1007',
            name: 'Донар',
            img: './img/donar.jpg',
            price: '13500',
        },
        {
            id: '1008',
            name: 'Клаб сэндвич',
            img: './img/klab.jpg',
            price: '20000',
        },
        {
            id: '1009',
            name: 'Хот-дог',
            img: './img/hotdog.jpg',
            price: '13000',
        },
        {
            id: '1010',
            name: 'Хагги',
            img: './img/haggi.jpg',
            price: '17000',
        },
        {
            id: '1011',
            name: 'Пирожные',
            img: './img/cake.jpg',
            price: '11000',
        },
        {
            id: '1012',
            name: 'Pepsi 1,5L',
            img: './img/pepsi.jpg',
            price: '9000',
        },
    ],

    cart: {
        total: '24500',
        products: [
            {
                id: '1004',
                name: 'Чизбургер',
                img: './img/chizburger.jpg',
                price: '15500',
                count: 1,
            },
            {
                id: '1012',
                name: 'Pepsi 1,5L',
                img: './img/pepsi.jpg',
                price: '9000',
                count: 1,
            },
        ],
    },

    queue: [
        {
            orderId: '5ef9d729-393f-422e-91c7-8e24f68da278',
            total: '37000',
            timestamp: '2019-10-19 10:10:00',
            products: [
                {
                    id: '1002',
                    name: 'Лаваш',
                    img: './img/lavash.jpg',
                    price: '14000',
                    count: 2,
                },
                {
                    id: '1012',
                    name: 'Pepsi 1,5L',
                    img: './img/pepsi.jpg',
                    price: '9000',
                    count: 1,
                },
            ],
        },
        {

            orderId: '6ef9d729-438f-422e-91c7-1e24f68da272',
            total: '13500',
            timestamp: '2019-10-19 10:12:30',
            products: [
                {
                    id: '1003',
                    name: 'Гамбургер',
                    img: './img/gamburger.jpg',
                    price: '13500',
                    count: 1,
                },
            ],
        },
    ],
};

export default initialState;