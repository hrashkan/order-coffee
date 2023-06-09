import "./PopularMenuItem.css"

export default function PopularMenuItem({ dir, title, price }) {
    return (

        <>
            {
                dir === 'rtl' ?
                    (
                        <div className="popular-item rtl">
                            <h3 className="popular-item__title">{title}</h3>
                            <span className="popular-item__price">${price}</span>
                        </div>
                    )
                    : (
                        <div className="popular-item">
                            <span className="popular-item__price">${price}</span>
                            <h3 className="popular-item__title">{title} </h3>
                        </div>
                    )
            }
        </>
    )
}
