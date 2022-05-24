import React from "react";
import { useState } from "react";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Onboarding() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [formData, setFormData] = useState({
		user_id: cookies.UserId,
		first_name: "",
		dob_day: "",
		dob_month: "",
		dob_year: "",
		show_gender: false,
		gender_identity: "man",
		gender_interest: "woman",
		url: "",
		about: "",
		matches: [],
	});
	let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put("http://localhost:8000/user", {
				formData,
			});
			const success = response.status === 200;
			console.log(response);
			if (success) navigate("/dashboard");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	const handleChange = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		const name = e.target.name;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log(formData);
	};
	return (
		<>
			<Nav
				setShowModal={() => {}}
				showModal={false}
				setIsSignUp={() => {}}
				authToken={true}
				minimal={false}
			/>
			<div className="onboarding">
				<h2>CREATE ACCOUNT</h2>
				<form onSubmit={handleSubmit}>
					<section>
						<label htmlFor="first_name">First Name</label>
						<input
							id="first_name"
							type="text"
							name="first_name"
							placeholder="first Name"
							required={true}
							value={formData.first_name}
							onChange={handleChange}
						/>
						<label>Date of birth</label>
						<div className="multiple-input-container">
							<input
								id="dob_day"
								type="number"
								name="dob_day"
								placeholder="DD"
								required={true}
								value={formData.dob_day}
								onChange={handleChange}
							/>
							<input
								id="dob_month"
								type="number"
								name="dob_month"
								placeholder="MM"
								required={true}
								value={formData.dob_month}
								onChange={handleChange}
							/>
							<input
								id="dob_year"
								type="number"
								name="dob_year"
								placeholder="YYYY"
								required={true}
								value={formData.dob_year}
								onChange={handleChange}
							/>
						</div>
						<label>Gender</label>
						<div className="multiple-input-container">
							<input
								id="man-gender-identity"
								type="radio"
								name="gender_identity"
								value="man"
								onChange={handleChange}
								checked={formData.gender_identity === "man"}
							/>
							<label htmlFor="man-gender-identity">Man</label>
							<input
								id="woman-gender-identity"
								type="radio"
								name="gender_identity"
								value="woman"
								onChange={handleChange}
								checked={formData.gender_identity === "woman"}
							/>
							<label htmlFor="woman-gender-identity">Woman</label>
							<input
								id="more-gender-identity"
								type="radio"
								name="gender_identity"
								value="more"
								onChange={handleChange}
								checked={formData.gender_identity === "more"}
							/>
							<label htmlFor="more-gender-identity">more</label>
						</div>
						<label htmlFor="show-gender">Show gender on my profile</label>
						<input
							id="show-gender"
							type="checkbox"
							name="show_gender"
							onChange={handleChange}
							checked={formData.show_gender}
						/>
						<label>Gender preferences</label>
						<div className="multiple-input-container">
							<input
								id="man-gender-interest"
								type="radio"
								name="gender_interest"
								value="man"
								onChange={handleChange}
								checked={formData.gender_interest === "man"}
							/>
							<label htmlFor="man-gender-interest">Man</label>
							<input
								id="woman-gender-interest"
								type="radio"
								name="gender_interest"
								value="woman"
								onChange={handleChange}
								checked={formData.gender_interest === "woman"}
							/>
							<label htmlFor="woman-gender-interest">Woman</label>
							<input
								id="everyone-gender-interest"
								type="radio"
								name="gender_interest"
								value="everyone"
								onChange={handleChange}
								checked={formData.gender_interest === "everyone"}
							/>
							<label htmlFor="everyone-gender-interest">Everyone</label>
						</div>
						<label htmlFor="about">About me</label>
						<input
							id="about"
							type="text"
							name="about"
							required={true}
							placeholder="i like long walks..."
							value={formData.about}
							onChange={handleChange}
						/>
						<input type="submit" />
					</section>
					<section>
						<label htmlFor="about">Profile Picture</label>
						<input
							type="url"
							name="url"
							id="url"
							onChange={handleChange}
							required={true}
						/>
						<div className="photo-container">
							{formData.url && (
								<img src={formData.url} alt="prof pic preview" />
							)}
						</div>
					</section>
				</form>
			</div>
		</>
	);
}

export default Onboarding;
