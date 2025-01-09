

// import { useContext } from "react"

import { useSearch } from "../../context/SearchContext"

const SearchPage = () => {
    const [search,setsearch] = useSearch()


    return (
        <div>
            <h1>
                {
                    search?.products.length > 1 ? "no product found" : `found ${search?.products.length}`
                }
            </h1>
            <div id="right-side" className="min-h-screen w-full p-6 flex flex-col gap-6 items-center border-2 border-gray-200">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4"> All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full h-full">
                    {search?.products.map((item, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <div className="w-full h-64 bg-gray-200">
                                <img
                                    className="w-full h-full object-cover"
                                    src={`/api/v1/auth/product/Photo-Product/${item._id}`}
                                    alt={item.name}
                                    onError={(e) => e.target.src = '/fallback-image.jpg'}
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-medium text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-600 mt-2">{item.description.substring(0, 30)}....</p>
                                <h4 className="text-lg font-semibold text-blue-500 mt-4">${item.price}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default SearchPage