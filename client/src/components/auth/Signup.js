import React,{useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    contentClearFix: {
        margin: 0,
        outline: 'none',
        padding: 0,
        width: 'auto',
    },
    gradient: {
        background: 'linear-gradient(white, #D3D8E8)',
        minWidth: '980px'
    },
    signupContent: {
        display: 'block',
        margin: '0 auto',
        width: '980px',
    },
    left: {
        float: 'left'
    },
    leftContent: {
        marginRight: '15px',
        width: '565',
        '& img': {
            width: '537px',
            height: '195px'
        }
    },
    leftContentText: {
        color: '#0e385f',
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '29px',
        marginTop: '40px',
        width: '450px',
        wordSpacing: '-1px',
    },

    right: {
        float: 'right'
    },
    rightContent: {
        maxWidth: '400px',
    },
    rightContentText: {
        padding: '20px 0',
        '& span': {
            fontSize: '36px',
            fontWeight: 600
        }
    },
    fullNameContainer: {
        display: 'flex'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#000 !important',
        }
    },
    notchedOutline: {
        borderWidth: '1px'
    },
    cssFocused: {
        color: ''
    },
    dayOfDOB: {
        padding: '5px',
        height: '30px',
        border: '1px solid #ccd0d5',
        "& option": {
            whiteSpace: 'pre',
            minHeight: '1.2em',
            padding: '0px 2px 1px'
        }
    },
    birthdayText: {
        color: '#90949c',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '5px'
    },
    genderText: {
        color: '#90949c',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '5px'
    },
    gender: {
        "& span": {
            borderRadius: '4px',
            borderWidth: '1px',
            display: 'inline-block',
            padding: '5px 0 5px 4px',
        },
        "& input[type='radio']": {
            margin: '3px 3px 0px 5px',
            boxSizing: 'border-box',
            padding: 'initial',
            border: 'initial'
        }
    },
    signupButton: {
        padding: '12px 48px',
        width: '50%'
    }
})
);

export default function Signup() {
    const classes = useStyles();

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [contactInfo,setContactInfo]=useState('');
    const [password,setPassword]=useState('');
    const [dayOfDOB,setDayOfDOB]=useState('');
    const [monthOfDOB,setMonthOfDOB]=useState('');
    const [yearOfDOB,setYearOfDOB]=useState('');
    const [gender,setGender]=useState('');

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905];

   const handleSubmit=(e)=>{
       e.preventDefault();
       const newUser={
           name:firstName+' '+lastName,
           contactInfo:contactInfo,
           password:password,
           dob:dayOfDOB+'/'+monthOfDOB+'/'+yearOfDOB,
           gender:gender
       };

       axios.post('http://localhost:8080/signup',newUser)
       .then(result=>{
           console.log(result)
       })
       .catch(err=>{
           console.log(err)
       })
   }

    return (
        <div className={classes.contentClearFix}>
            <div className={classes.gradient}>
                <div className={classes.signupContent}>
                    <div className={classes.left}>
                        <div className={classes.leftContent}>
                            <div className={classes.leftContentText}>
                                SocialConnect helps you connect and share with the people in your life.
                    </div>
                            <img src="/images/facebook-img.png" alt="" />
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
                                        placeholder="Enter First Name"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        name="firstName"
                                        InputProps={{
                                            classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                    <TextField
                                        id="outlined-with-placeholder"
                                        label="Last Name"
                                        placeholder="Enter Last Name"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        name="lastName"
                                        InputProps={{
                                            classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </div>
                                <TextField
                                    id="outlined-with-placeholder"
                                    label="Contact info"
                                    placeholder="Mobile number or email address"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    name="contactInfo"
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                    onChange={(e)=>setContactInfo(e.target.value)}
                                />
                                <TextField
                                    id="outlined-with-placeholder"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />

                                <div className={classes.birthday}>
                                    <div className={classes.birthdayText}>Birthday</div>
                                    <select className={classes.dayOfDOB} name="dayOfDOB" id="" onChange={(e)=>setDayOfDOB(e.target.value)}>
                                        <option value="0">Day</option>
                                        {days.map((day,index) => (
                                            <option key={index} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <select className={classes.dayOfDOB} name="monthOfDOB" id="" onChange={(e)=>setMonthOfDOB(e.target.value)}>
                                        <option value="0">Month</option>
                                        {months.map((month,index) => (
                                            <option key={index} value={index+1}>{month}</option>
                                        ))}
                                    </select>
                                    <select className={classes.dayOfDOB} name="yearofDOB" id="" onChange={(e)=>setYearOfDOB(e.target.value)}>
                                        <option value="0">Year</option>
                                        {years.map((year,index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={classes.gender}>
                                    <div className={classes.genderText}>Gender</div>
                                    <span>
                                        <input type="radio" name="gender" value="F" id="femaleradio" onChange={(e)=>setGender(e.target.value)} />
                                        <label htmlFor="femaleradio">Female</label>
                                    </span>

                                    <span>
                                        <input type="radio" name="gender" value="M" id="maleradio" onChange={(e)=>setGender(e.target.value)} />
                                        <label htmlFor="maleradio">Male</label>
                                    </span>

                                    <span>
                                        <input type="radio" name="gender" value="Ot" id="femaleradio" onChange={(e)=>setGender(e.target.value)} />
                                        <label htmlFor="femaleradio">Others</label>
                                    </span>

                                </div>
                            </div>
                        </div>
                        <Button onClick={handleSubmit} variant="contained" className={classes.signupButton}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
