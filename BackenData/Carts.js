import React, {useS} from "react";

const uri = [
    'https://cdn.westkiss.com/media/catalog/product/cache/6/thumbnail/750x/9df78eab33525d08d6e5fb8d27136e95/h/d/hd_lace_wigs_1_3.jpg',
    'https://cdn.shopify.com/s/files/1/0331/7360/2435/products/0311-1_84ab90b0-a66a-42b4-bfcd-27bd5b8e5ca8_500x.jpg?v=1618321705',
    'https://www.ebonyline.com/media/catalog/product/cache/12f18601bc7e228bd8bc3700393db4ac/s/e/sensationnel-empire-wig-britta-1.jpg',
     'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1634779801-41IvwQzYEzL._SL500_.jpg?crop=0.670xw:1.00xh;0.180xw,0&resize=768:*'
]

export let CARTTOTAL = 0;

const mocCart =     {shippingInfo:{name:'test',address:'123 street'},
                    cartItems:[
                        {name:'abcde',
                            desc:'this is the products description lol',
                            price: 999, 
                            img:uri[0]
                        },
                        {name:'abcd',
                            desc:'this is the products description lol',
                            price: 999, 
                            img:uri[1]
                        },
                        {name:'abc',
                            desc:'this is the products description lol',
                            price: 999, 
                            img:uri[2]
                        },
                        {name:'ab',
                            desc:'this is the products description lol',
                            price: 999, 
                            img:uri[3]
                        },
                    ],
                    cartTotal:totalCart,
                    }





const totalCart = mocCart.cartItems.map(({price}) => {
    CARTTOTAL += price
    return(
        CARTTOTAL
    )
})
export default mocCart