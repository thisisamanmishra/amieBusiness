import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar";
import { setError } from "../../redux/slices/appSlice";
import { setIsRestaurantUPdated } from '../../redux/slices/restaurantSlice';
import { getRestaurantsAction, updateRestaurant, uploadRestaurantPicture } from '../../redux/actions/restaurantAction';

function RestaurantForm() {


    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [address, setAddress] = useState('');
    const [ openingTime, setOpeningTime ] = useState(' ');
    const [ closingTime, setClosingTime ] = useState(' ');
    const [images, setImages] = useState([]);
    const { isRestaurantUpdated, isLoading, restaurant } = useSelector((state) => state.restaurantState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantsAction(id))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (restaurant) {
            setName(restaurant.restaurantName);
            setLatitude(restaurant.latitude);
            setLongitude(restaurant.longitude)
            setAddress(restaurant.address);
            
            setClosingTime(restaurant.closingTime);
            setOpeningTime(restaurant.openingTime);
          
        }
    }, [restaurant])

    useEffect(() => {
        if (isRestaurantUpdated) {
            navigate('/home');
            dispatch(setIsRestaurantUPdated(false));
        }
    }, [isRestaurantUpdated, dispatch, navigate]);

    
    const updloadImageHandler = () => {
      const formData = new FormData();

      images.forEach((image) => {
          formData.append('pictures', image);
      })

      dispatch(uploadRestaurantPicture(formData, restaurant._id))
      setImages([]);
  }


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name,
            latitude,
            longitude,
            address,
            openingTime,
            closingTime
        }

        dispatch(updateRestaurant(formData, id));
    }


  return (
    <div className='list'>
     <Sidebar />
      <div className='listContainer'>
      <Navbar />
        <div className='heading justify-center px-8 pt-2 pb-8 mb-4 w-70'>
          <h1 className='text-5xl font-normal leading-normal mt-0 mb-2 text-black-800 ml-0'>Restaurant Information</h1>
        </div>
        <div className='form '>
          <form class="bg-white shadow-md px-4 pt-2 pb-8 mb-4 ">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                <h3 className='text-4xl font-normal leading-normal mt-0 mb-2 text-black-800 ml-0'>Restaurant details</h3>
                <h4 className='text-2xl font-normal leading-normal mt-0 mb-2 text-black-800'>Name ,address and location</h4>
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Restauran Name" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div class="mb-6">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Restaurant Complete Address" value={name} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
              <p class="text-sm"> Please ensure this is same as the address on your FSSAI Document (if applicable)</p>
            </div>
            <h2 className='text-5xl font-normal leading-normal  mb-2 text-black-900 mt-5'>Please Enter Your Location.</h2>
            <div class="flex items-center justify-between">
              <div className='mb-8'>

                <div class="w-full md:w-1/2 px-3 mb-10 md:mb-0">
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" value={name} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3  mb-10 md:mb-0">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-1"  type="text" value={name} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
                  </div>
                </div>
                <fieldset className="w-full space-y-1 dark:text-gray-900">
	                  <label for="files" className="block text-lg font-medium">Restaurant's Images</label>
                    <label for="files" className="block text-sm font-medium">(You can add upto 5 images)</label>
	                  <div className="flex">
	                	    <input name="files" id="files" class="px-8 py-12 border-2 border-dashed rounded-md" accept="image/*" multiple type="file" onChange={(e) => {
                                                    if (e.target.files.length <= 5) {
                                                        setImages(Array.from(e.target.files));
                                                    } else {
                                                        dispatch(setError("Maximum 5 Images can be uploaded."))
                                                    }
                                                }
                                                }/>
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2" onClick={updloadImageHandler}>
                    Add
                  </button>

	                  </div>
                    <label for="files" className="block text-lg font-medium">Menu Image</label>
	                  <div className="flex">
	                	    <input type="file" name="files" id="files" class="px-8 py-12 border-2 border-dashed rounded-md"/>
	                  </div>
                </fieldset>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-10">
                  <h3 className='text-5xl font-normal leading-normal mt-0 mb-2 text-black-800 ml-0'><b>Contact number at restaurant</b></h3>
                  <h6 className='text-2xl font-normal leading-normal mt-0 mb-2 text-black-800'>Your customer will contact you on this number for enquries </h6>
                  <div class="form-row">
                    <input type="text" placeholder="Mobile Number" class="bg-transparent py-1 text-gray-600 px-4 focus:outline-none w-full" /> 
                   
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-10">
                  <h3 className='text-5xl font-normal leading-normal mt-0 mb-2 text-black-800 ml-0'><b>Restaurant owner details</b></h3>
                  <h6 className='text-2xl font-normal leading-normal mt-0 mb-2 text-black-800'>These will be used to communication</h6>

                  <div class="custom-control custom-checkbox mt-2">
                    <input type="checkbox" className="custom-control-input mr-4" id="customCheck" />
                    <label class="custom-control-label" for="customCheck">Yes, I  would like important updates and notification from Amie on my whatsapp</label>
                  </div>
                  <div class="form-row mt-2">
                    <div class="col">
                      <input type="text" class="form-control mt-2" placeholder="Your Name " />
                    </div>
                    <div class="col">
                      <input type="email" class="form-control mt-2" placeholder="Your Email id " />
                    </div>
                  </div>

                </form>
                <section className='mt-5'>
                  Amie may disclose the Information provided by you.Including but now limited to the Contact number and email
                  address of the authorised persons , with third party providers for provision of Amie service.

                  <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2">
                    help
                  </button>

                </section>


              </div>

            </div>
            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default RestaurantForm