import React from 'react'
import { type Category } from '@prisma/client'
import Product from './product'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getProductsByCategory } from '@/actions/productAction'

type Props = {
    productId: string,
    productCategory: Category,
    productTitle: string,
    description: string,
    price: number,
    productImage: string,
}

export default async function RelatedProducts(props: Props) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const productsByCategory = await getProductsByCategory({ category: props.productCategory });
    const products = productsByCategory.filter(product => product.id !== props.productId);

    return (
        <section className="bg-white py-8 px-3 antialiased dark:bg-gray-900 md:py-16">
            <div className="xl:mt-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                {/* //* This is for mobile screens */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:mt-8 lg:hidden">
                    {products.slice(0, 4).map((product) => (
                        <div key={product.id}>
                            <Product
                                userId={user ? user.id : null}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                productImage={product.image ?? ""}
                                productTitle={product.productTitle}
                            />
                        </div>
                    ))}
                </div>
                {/* //* This is for tablet screens */}
                <div className="hidden mt-6 lg:grid xl:hidden grid-cols-3 gap-4 sm:mt-8">
                    {products.slice(0, 6).map((product) => (
                        <div key={product.id}>
                            <Product
                                userId={user ? user.id : null}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                productImage={product.image ?? ""}
                                productTitle={product.productTitle}
                            />
                        </div>
                    ))}
                </div>
                {/* //* This is for wide screens */}
                <div className="hidden mt-6 xl:grid grid-cols-4 gap-4 sm:mt-8">
                    {products.slice(0, 8).map((product) => (
                        <div key={product.id}>
                            <Product
                                userId={user ? user.id : null}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                productImage={product.image ?? ""}
                                productTitle={product.productTitle}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
