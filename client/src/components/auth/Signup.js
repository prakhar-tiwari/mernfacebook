import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SuccessDialog from "./SuccessDialog";

const useStyles = makeStyles((theme) => ({
  contentClearFix: {
    margin: 0,
    outline: "none",
    padding: 0,
    width: "auto",
  },
  gradient: {
    backgroundImage: "linear-gradient(white, #D3D8E8)",
    minWidth: "980px",
  },
  signupContent: {
    display: "block",
    margin: "0 auto",
    width: "980px",
  },
  left: {
    float: "left",
  },
  leftContent: {
    marginRight: "15px",
    width: "565",
    "& img": {
      width: "537px",
      height: "195px",
    },
  },
  leftContentText: {
    color: "#0e385f",
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "29px",
    marginTop: "40px",
    width: "450px",
    wordSpacing: "-1px",
  },

  right: {
    float: "right",
  },
  rightContent: {
    maxWidth: "400px",
  },
  rightContentText: {
    padding: "20px 0",
    "& span": {
      fontSize: "36px",
      fontWeight: 600,
    },
  },
  fullNameContainer: {
    display: "flex",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#000 !important",
    },
  },
  notchedOutline: {
    borderWidth: "1px",
  },
  cssFocused: {
    color: "",
  },
  dayOfDOB: {
    padding: "5px",
    height: "30px",
    border: "1px solid #ccd0d5",
    "& option": {
      whiteSpace: "pre",
      minHeight: "1.2em",
      padding: "0px 2px 1px",
    },
  },
  birthdayText: {
    color: "#90949c",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
  },
  genderText: {
    color: "#90949c",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
  },
  gender: {
    "& span": {
      borderRadius: "4px",
      borderWidth: "1px",
      display: "inline-block",
      padding: "5px 0 5px 4px",
    },
    "& input[type='radio']": {
      margin: "3px 3px 0px 5px",
      boxSizing: "border-box",
      padding: "initial",
      border: "initial",
    },
  },
  signupButton: {
    marginTop: "5px",
    padding: "12px 48px",
    width: "50%",
    background:
      "linear-gradient(to right , rgba(19, 54, 131,.9),rgba(19, 54, 131,.9))",
    color: "#fff",
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [dayOfDOB, setDayOfDOB] = useState("");
  const [monthOfDOB, setMonthOfDOB] = useState("");
  const [yearOfDOB, setYearOfDOB] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [signupResponse, setSignupResponse] = useState("");

  const days = Array.from(Array(31), (x, index) => index + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from(
    Array(100),
    (x, index) => new Date(Date.now()).getFullYear() - index
  );

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setContactInfo("");
    setPassword("");
    setDayOfDOB("");
    setMonthOfDOB("");
    setYearOfDOB("");
    setGender("");
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      contactInfo: contactInfo,
      password: password,
      dob: dayOfDOB + "/" + monthOfDOB + "/" + yearOfDOB,
      gender: gender,
    };

    axios
      .post("/signup", newUser)
      .then((result) => {
        clearFields();
        setSignupResponse(result.data.message);
        setModalOpen(true);
      })
      .catch((err) => {
        let errors = {};
        if (err.response.data.message) {
          clearFields();
          setSignupResponse(err.response.data.message);
          setModalOpen(true);
        }
        if (err.response.data.length > 0) {
          err.response.data.map((er) => {
            if (er.nestedErrors) {
              errors[er.nestedErrors[0].param] = er.msg;
            } else {
              errors[er.param] = er.msg;
            }
          });
        }
        setErrors(errors);
      });
  };

  return (
    <div className={classes.contentClearFix}>
      <div className={classes.gradient}>
        <div className={classes.signupContent}>
          <div className={classes.left}>
            <div className={classes.leftContent}>
              <div className={classes.leftContentText}>
                SocialConnect helps you connect and share with the people in
                your life.
              </div>
              <img src="/images/socialconnect.jpg" alt="" />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.rightContent}>
              <div className={classes.rightContentText}>
                <span>Create an account</span>
              </div>
              <div className={classes.registrationContainer}>
                <div className={classes.fullNameContainer}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="First Name"
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName}
                    placeholder="Enter First Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="firstName"
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <TextField
                    id="outlined-with-placeholder"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="lastName"
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
                <TextField
                  id="outlined-with-placeholder"
                  label="Contact info"
                  placeholder="Mobile number or email address"
                  error={errors.contactInfo ? true : false}
                  helperText={errors.contactInfo}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  name="contactInfo"
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  onChange={(e) => setContactInfo(e.target.value)}
                  value={contactInfo}
                />
                <TextField
                  id="outlined-with-placeholder"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  error={errors.password ? true : false}
                  helperText={errors.password}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  name="password"
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <div className={classes.birthday}>
                  <div className={classes.birthdayText}>Birthday</div>
                  <select
                    className={classes.dayOfDOB}
                    name="dayOfDOB"
                    id=""
                    onChange={(e) => setDayOfDOB(e.target.value)}
                  >
                    <option value="0">Day</option>
                    {days.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    className={classes.dayOfDOB}
                    name="monthOfDOB"
                    id=""
                    onChange={(e) => setMonthOfDOB(e.target.value)}
                  >
                    <option value="0">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className={classes.dayOfDOB}
                    name="yearofDOB"
                    id=""
                    onChange={(e) => setYearOfDOB(e.target.value)}
                  >
                    <option value="0">Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={classes.gender}>
                  <div className={classes.genderText}>Gender</div>
                  <span>
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      id="femaleradio"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="femaleradio">Female</label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      id="maleradio"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="maleradio">Male</label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      name="gender"
                      value="Ot"
                      id="otherRadio"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="femaleradio">Others</label>
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className={classes.signupButton}
            >
              Sign Up
            </Button>
            <SuccessDialog
              open={modalOpen}
              signupResponse={signupResponse}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
