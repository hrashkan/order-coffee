import { useState } from "react"
import { Link } from "react-router-dom"
import MainButton from "../../Components/MainButton/MainButton"
import MainTitle from "../../Components/MainTitle/MainTitle"
import ServicesBox from "../../Components/ServicesBox/ServicesBox"
import PopularMenuItem from "../../Components/PopularMenuItem/PopularMenuItem"
import ProductBox from "../../Components/ProductBox/ProductBox"
import { useFormik } from "formik"
import DatePicker from "react-datepicker";
import Modal from "../../Components/Modal/Modal"
import "react-datepicker/dist/react-datepicker.css";
import "./Index.css"
import useFetchData from "../../../Hooks/useFetchData"

export default function Index() {

  const { data: cities } = useFetchData('cities');
  const { data: coffeeItems } = useFetchData('coffee');
  const { data: espressoItems } = useFetchData('EspressoItems');
  const { data: milkBased } = useFetchData('Milk-based');
  const { data: coldDrinks } = useFetchData('coldDrinks');
  const { data: deserts } = useFetchData('deserts');
  const { data: services } = useFetchData('services');
  const { data: popular } = useFetchData('popular');
  const [activeModal, setActiveModal] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());



  //validate form with Formik
  const order = useFormik({
    initialValues: {
      "coffee": "-1",
      "coffeeType": "-1",
      "name": "",
      "phone": "",
      "address": "-1",
      "addressDetail": "",
    },

    onSubmit: (values) => {
      if (!startDate || !startTime) {
        setActiveModal(true)
        setIsOrderComplete(false)
      } else {
        setActiveModal(true)
        setIsOrderComplete(true)
        setUserFullName(values.name);
        setUserCity(values.address);
      }
    },

    validate: (values) => {
      const errors = {}

      if (!values.phone) {
        errors.phone = "Phone is required"
      } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/.test(Number(values.phone))) {
        errors.phone = "phone format is incorrect"
      }

      if (!values.name) {
        errors.name = "Name is Required"
      } else if (values.name.length < 4) {
        errors.name = "Name must be at last 5 char"
      }

      if (values.coffee === "-1") {
        errors.coffee = "select a category"
      }

      if (values.address === "-1") {
        errors.address = "choose a city for order"
      }

      if (!values.addressDetail) {
        errors.addressDetail = "address for ordering is required"
      } else if (!/^[A-Za-z0-9'.\-\s,#]+$/i.test(values.addressDetail) || values.addressDetail.length < 20) {
        errors.addressDetail = "incorrect address (address must have at least 20 char)"
      }

      console.log(errors)
      return errors
    }

  })

  return (
    <main className="main">

      <section className="introduce">
        <div className="introduce__container">
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img1" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img2" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img3" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img4" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img5" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img6" />
          <img src="/img/index/Coffee.png" alt="" className="introduce__coffee-img7" />
          <div className="container flex-col">
            <h1 className="main-title">
              elza coffee
            </h1>
            <span className="introduce-desc">
              Today`s good mood is sponsored by coffee
              search for your coffee now
            </span>
            <div className="introduce__buttons">
              <MainButton
                model={1}
                title='Shop Now'
                link='https://react.dev'
              />
              <MainButton
                model={2}
                title='Catalog'
                link='https://react.dev'
              />
            </div>
            <div className="introduce__box">
              <img src="/img/index/Cup1.png" alt="" className="introduce__box-img" />
              <div className="introduce__box-content">
                <p className="introduce__box-title">
                  buy first coffee
                </p>
                <button className="introduce__box-button">
                  <span className="introduce__box-button-title">hurry up</span>
                  <svg className="introduce__box-button-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.09811 15.2351C8.05211 15.2329 8.00116 15.2306 7.9448 15.2293C7.61204 15.2189 7.1634 15.2189 6.53802 15.2189C5.91218 15.2189 5.46354 15.2189 5.13123 15.2293C5.07487 15.2311 5.02392 15.2329 4.97793 15.2351C5.03481 15.6081 5.22345 15.9484 5.50966 16.1943C5.79587 16.4402 6.1607 16.5753 6.53802 16.5753C6.91533 16.5753 7.28016 16.4402 7.56637 16.1943C7.85258 15.9484 8.04122 15.6081 8.09811 15.2351ZM6.53802 17.4734C6.86368 17.4734 7.18616 17.4092 7.48704 17.2846C7.78791 17.16 8.0613 16.9773 8.29158 16.747C8.52186 16.5167 8.70453 16.2433 8.82915 15.9425C8.95378 15.6416 9.01793 15.3191 9.01793 14.9934C9.01793 14.7932 9.01793 14.6521 8.95345 14.5529C8.8006 14.3171 8.28387 14.3171 6.53802 14.3171C4.05811 14.3171 4.05811 14.3171 4.05811 14.9934C4.05811 15.6512 4.31938 16.2819 4.78445 16.747C5.24953 17.2121 5.8803 17.4734 6.53802 17.4734ZM14.0567 7.55371H16.2322V12.9644H15.3304V8.4555H14.8006L13.5187 15.0791L12.6332 14.9078L14.0567 7.55371ZM17.336 16.5436C17.5396 16.5047 17.7335 16.426 17.9067 16.3121C18.0799 16.1982 18.2289 16.0513 18.3453 15.8798C18.4617 15.7083 18.5432 15.5156 18.5851 15.3126C18.627 15.1096 18.6285 14.9003 18.5895 14.6968L19.475 14.5272C19.5987 15.1732 19.4606 15.8419 19.0913 16.3861C18.7219 16.9303 18.1515 17.3055 17.5055 17.4292C16.8595 17.5528 16.1909 17.4148 15.6467 17.0454C15.1024 16.6761 14.7272 16.1057 14.6036 15.4597L15.4891 15.2901C15.5281 15.4937 15.6067 15.6876 15.7206 15.8608C15.8345 16.034 15.9814 16.183 16.1529 16.2994C16.3244 16.4158 16.5172 16.4973 16.7202 16.5392C16.9232 16.5811 17.1324 16.5826 17.336 16.5436Z" fill="#F8E4BE" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.2031 13.3306C17.906 13.1225 17.5585 12.9979 17.1969 12.9697C16.8353 12.9415 16.4727 13.0107 16.147 13.1702C15.8212 13.3297 15.5441 13.5736 15.3446 13.8765C15.1451 14.1794 15.0304 14.5302 15.0125 14.8925L18.9092 14.2054C18.7609 13.8531 18.5161 13.5499 18.2031 13.3306ZM16.5303 12.1064C17.2052 11.9875 17.9005 12.1088 18.4953 12.4494C19.09 12.7899 19.5466 13.3281 19.7857 13.9704C19.9913 14.5214 19.5792 15.003 19.1157 15.0841L15.1194 15.7893C14.6563 15.8705 14.1044 15.5594 14.1085 14.9714C14.1135 14.2861 14.3585 13.6241 14.8009 13.1007C15.2434 12.5773 15.8553 12.2255 16.5303 12.1064ZM9.46882 9.35735H5.41078C5.2912 9.35735 5.17651 9.40486 5.09195 9.48942C5.0074 9.57397 4.95989 9.68866 4.95989 9.80824V10.71H9.91971V9.80824C9.91971 9.68866 9.87221 9.57397 9.78765 9.48942C9.70309 9.40486 9.5884 9.35735 9.46882 9.35735ZM5.41078 8.45557C5.05203 8.45557 4.70797 8.59808 4.4543 8.85176C4.20062 9.10543 4.05811 9.44949 4.05811 9.80824V11.1609C4.05811 11.2805 4.10561 11.3952 4.19017 11.4798C4.27473 11.5643 4.38941 11.6118 4.509 11.6118H10.3706C10.4902 11.6118 10.6049 11.5643 10.6894 11.4798C10.774 11.3952 10.8215 11.2805 10.8215 11.1609V9.80824C10.8215 9.44949 10.679 9.10543 10.4253 8.85176C10.1716 8.59808 9.82757 8.45557 9.46882 8.45557H5.41078Z" fill="#F8E4BE" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.46861 11.6118H6.35114C4.55974 11.6118 3.12636 12.7999 2.78368 14.3171H9.41857C9.43639 14.3181 9.45402 14.313 9.46861 14.3027V11.6118ZM6.35114 10.71C3.83967 10.71 1.80344 12.6389 1.80344 15.0187C1.80344 15.1292 1.89812 15.2189 2.01536 15.2189H9.41857C9.94431 15.2189 10.3704 14.8154 10.3704 14.3171V11.0707C10.3704 10.8714 10.2 10.71 9.98985 10.71H6.35114ZM15.7811 5.75017H14.8793C14.6402 5.75017 14.4108 5.84518 14.2417 6.0143C14.0726 6.18342 13.9775 6.41279 13.9775 6.65196C13.9775 6.89113 14.0726 7.1205 14.2417 7.28962C14.4108 7.45874 14.6402 7.55375 14.8793 7.55375H15.7811V5.75017ZM14.8793 4.84839C14.401 4.84839 13.9422 5.03841 13.604 5.37664C13.2658 5.71488 13.0758 6.17362 13.0758 6.65196C13.0758 7.1303 13.2658 7.58904 13.604 7.92728C13.9422 8.26551 14.401 8.45553 14.8793 8.45553H16.4056C16.5589 8.45553 16.6829 8.33109 16.6829 8.17823V5.12569C16.6829 5.05214 16.6537 4.98161 16.6017 4.92961C16.5497 4.8776 16.4791 4.84839 16.4056 4.84839H14.8793Z" fill="#F8E4BE" />
                    <path d="M11.4284 5.29932L13.6491 5.68979L13.4926 6.57805L11.2724 6.18758L11.4284 5.29932Z" fill="#F8E4BE" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.4287 15.219H9.01794V14.3172H14.4287V15.219ZM13.5269 12.9645H9.46884V12.0627H13.5269V12.9645Z" fill="#F8E4BE" />
                  </svg>

                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="off-screen">

        <section className="story">
          <div className="container">
            <div className="story-wrapper">
              <div className="row">
                <div className="col-12 col-lg-4 d-lg-hidden relative">
                  <img src="/img/index/ourStory.png" alt="sour story" className="story__banner" />
                </div>
                <div className="col-12 col-lg-8 relative">
                  <div className="story__title">
                    <MainTitle title='Our Story' />
                  </div>
                  <div className="story__desc">
                    <span className="story__desc-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.
                    </span>
                  </div>
                  <div className="story__link">
                    <Link className="story__link-item" to='https://react.dev'>More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services">
          <div className="container">
            <MainTitle title='Services' />
            <div className="row">

              {
                services.length && services.map(item => (
                  <ServicesBox key={item.id} {...item} />
                ))
              }

            </div>
          </div>

        </section>

        <section className="offers">
          <div className="container">
            <div className="offers-wrapper">
              <div className="row lg-col-revers">
                <div className="col-12 col-lg-8">
                  <MainTitle title='Offers' />
                  <div className="offers__content">
                    <h3 className="offers__subtitle">
                      Up to
                      <span className="offers__subtitle-percent">
                        50%
                      </span>
                      off
                    </h3>
                    <p className="offers__desc">
                      At our cafe, we take pride in providing our customers with the best coffee around. Our carefully-selected coffees come from some of the most renowned coffee growing regions in the world, ensuring that each cup is unrivaled in flavor and freshness.
                    </p>

                    <MainButton
                      model={1}
                      title='Shop Now'
                      link='https://react.dev'
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <img src="/img/index/offersBanner.png" alt="offers" className="offers__banner" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="recommended">
          <div className="container">
            <MainTitle title="Recommended" />
            <div className="row">
              <ProductBox />
              <ProductBox />
              <ProductBox />
            </div>
          </div>
        </section>

        <section className="order">
          <MainTitle title='Order' />
          <div className="container">
            <div className="row lg-col-revers">
              <div className="col-12 col-lg-4">
                <img src="/img/index/Reserve Img.png" alt="order" className="order__banner" />
              </div>
              <div className="col-12 col-lg-8">
                <form id="form" className="order-form" onSubmit={order.handleSubmit}>
                  <div className="row">
                    {/* date  */}
                    <div className="col-6">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={(new Date())}
                        placeholderText="pick a day"
                      />
                    </div>
                    <div className="col-6">
                      <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="pick a time"
                      />
                    </div>
                    {/* coffee type  */}
                    <div className="col-6">
                      <select
                        name="coffee"
                        defaultValue="-1"
                        className="form-__coffee"
                        onChange={order.handleChange}
                      >
                        <option value="-1">Categories</option>
                        {
                          coffeeItems.length &&
                          coffeeItems.map(item => (
                            <option key={item.id} value={item.cat}>{item.cat}</option>
                          ))
                        }


                      </select>
                      <span className="error-message">
                        {order.errors.coffee && order.errors.coffee}
                      </span>

                    </div>
                    <div className="col-6">
                      <select
                        name="coffeeType"
                        defaultValue="-1"
                        className="form-__coffee-type"
                        onChange={order.handleChange}
                      >

                        {
                          order.values.coffee === "-1" ?
                            (
                              <option value="-1">choose a cat to see coffee list</option>
                            )
                            : order.values.coffee === "Espresso" ?
                              (
                                espressoItems.map(item => (
                                  <option key={item.id} value={item.name}>{item.name}</option>
                                ))
                              ) : order.values.coffee === "Milk-based drinks" ?
                                (
                                  milkBased.map(item => (
                                    <option key={item.id} value={item.name} >{item.name}</option>
                                  ))
                                ) : order.values.coffee === "Cold drinks" ?
                                  (
                                    coldDrinks.map(item => (
                                      <option key={item.id} value={item.name} >{item.name}</option>
                                    ))
                                  ) : order.values.coffee === "Coffee desserts" ?
                                    (
                                      deserts.map(item => (
                                        <option key={item.id} value={item.name} >{item.name}</option>
                                      ))
                                    )
                                    : ('')
                        }


                      </select>
                    </div>
                    {/* name phone  */}
                    <div className="col-6">
                      <input
                        type="text"
                        name="name"
                        value={order.values.name}
                        className="form__name"
                        placeholder="your name"
                        onChange={order.handleChange}
                        onBlur={order.handleBlur}

                      />
                      <span className="error-message">
                        {order.errors.name && order.touched.name && order.errors.name}
                      </span>
                    </div>
                    <div className="col-6">
                      <input
                        name="phone"
                        value={order.values.phone}
                        type="tel" className="form__contact"
                        placeholder="your phone number"
                        onChange={order.handleChange}
                        onBlur={order.handleBlur}

                      />
                      <span className="error-message">
                        {order.errors.phone && order.touched.phone && order.errors.phone}
                      </span>
                    </div>
                    {/* address  */}
                    <div className="col-12">
                      <select
                        name="address"
                        defaultValue="-1"
                        className="form-__address"
                        onChange={order.handleChange}
                      >
                        <option value="-1">Choose your city</option>
                        {
                          cities.length &&
                          cities.map(city => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                          ))
                        }

                      </select>
                      <span className="error-message">
                        {order.errors.address && order.errors.address}
                      </span>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form__address-detail"
                        name="addressDetail"
                        value={order.values.addressDetail}
                        cols="30"
                        rows="10"
                        onChange={order.handleChange}
                        onBlur={order.handleBlur}
                        placeholder="your address"
                      ></textarea>
                      <span className="error-message">
                        {order.errors.addressDetail && order.touched.addressDetail && order.errors.addressDetail}
                      </span>
                    </div>
                    {/* submit  */}
                    <div className="col-12">
                      <input
                        className={`form__submit ${!order.isValid && 'disabled'}`}
                        type="submit"
                        value="Order"
                        disabled={!order.isValid}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section >



        {/* todo  */}
        <section className="popular" >
          <div className="popular-container">
            <MainTitle title='Popular Menu' />
            <div className="popular-wrapper">
              <div className="popular__menu-left">

                {
                  popular.length &&
                  [...popular].splice(0, 4).map(item => (
                    <PopularMenuItem key={item.id} {...item} />
                  ))
                }
              </div>
              <div className="popular__menu-banner">
                <img src="/img/index/popularMenu.png" alt="menu" className="popular__menu-img" />
              </div>
              <div className="popular__menu-right">
                {
                  popular.length &&
                  [...popular].splice(4, 7).map(item => (
                    <PopularMenuItem
                      key={item.id}
                      {...item}
                      dir="rtl"
                    />
                  ))
                }

              </div>
            </div>
            <div className="popular__link">
              <Link to='https://react.dev' className="popular__link-button">
                Our Menus
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 16H8.9L11 13.9L7 10L9.8 7.2L13.9 11.1L16 8.9V16ZM5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21ZM5 5H19V19H5V5Z" fill="#F8E4BE" />
                </svg>

              </Link>
            </div>
            <img src="/img/index/Frame.png" alt="coffee" className="popular__bg-img1" />
            <img src="/img/index/Frame.png" alt="coffee" className="popular__bg-img2" />
            <img src="/img/index/Frame.png" alt="coffee" className="popular__bg-img3" />
            <img src="/img/index/Frame.png" alt="coffee" className="popular__bg-img4" />
          </div>
        </section >

        <Modal
          activeModal={activeModal}
          isOrderComplete={isOrderComplete}
          userFullName={userFullName}
          userCity={userCity}
          setActiveModal={setActiveModal}
          startTime={startTime}
        />

      </div >
    </main >
  )
}
