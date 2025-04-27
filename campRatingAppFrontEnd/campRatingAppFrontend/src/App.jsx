
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home.jsx";
import LoginForm from "./LoginForm/LoginForm.jsx";
import SingUpForm from "./SignUpForm/SingUpForm.jsx";
import CampgroundInfoPage from "./CampgroundInfoPage/CampgroundInfoPage.jsx";
import CreateCampgroundForm from "./CreateCampgroundForm/CreateCampgroundForm.jsx";
import CreateReviewForm from "./CreateReviewForm/CreateReviewForm.jsx";
import MyReviews from "./MyReviewsPage/MyReviews.jsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element = {<LoginForm />} />
              <Route path="/home" exact element = {<Home />} />
              <Route path="/signupform" exact element = {<SingUpForm />} />
              <Route path="/signupform" exact element = {<SingUpForm />} />
              <Route path="/campground/:id" element={<CampgroundInfoPage />} />
              <Route path="/createCampgroundForm" element={<CreateCampgroundForm />} />
              <Route path="/createReviewForm" element={<CreateReviewForm />} />
              <Route path="/MyReviews" element={<MyReviews />} />



          </Routes>
      </BrowserRouter>
  )
}

export default App
