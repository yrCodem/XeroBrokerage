"use client";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import AuthLayout from "../layout/page";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      setIsSubmitting(true);
      const url = "http://localhost:3000/api/auth/signup";
      const values = formData;

      try {
        const response = await axios.post(url, values, {
          withCredentials: true,
        });

        if (response.data.success) {
          toast.success("Registered Successfully..!", {
            theme: "dark",
            position: "bottom-right",
            autoClose: 3000,
          });
        }
        router.push("/Auth/login");
      } catch (err) {
        console.log(err);

        toast.error(err.response.data.message || "error", {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AuthLayout>
      <StyledForm onSubmit={handleSubmit}>
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Join XeroBrokerage today</p>

        <div className="input-group">
          <label>Full Name</label>
          <div className={`inputForm ${errors.name ? "error" : ""}`}>
            <svg
              height={20}
              viewBox="0 0 24 24"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <div className={`inputForm ${errors.email ? "error" : ""}`}>
            <svg
              height={20}
              viewBox="0 0 32 32"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </g>
            </svg>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className={`inputForm ${errors.password ? "error" : ""}`}>
            <svg
              height={20}
              viewBox="-64 0 512 512"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <div className={`inputForm ${errors.confirmPassword ? "error" : ""}`}>
            <svg
              height={20}
              viewBox="-64 0 512 512"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="terms-group">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms">
            I agree to the{" "}
            <Link href="../../terms-and-conditions" className="terms-link">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="../../privacy-page" className="terms-link">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeTerms && (
          <div className="error-message">{errors.agreeTerms}</div>
        )}

        <button
          className={`button-submit ${isSubmitting ? "submitting" : ""}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <span className="spinner"></span> : "Create Account"}
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link href="../../Auth/login" className="span">
            Log in
          </Link>
        </p>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">Or sign up with</span>
          <span className="divider-line"></span>
        </div>

        <div className="social-buttons">
          <button className="btn google" type="button">
            <svg
              version="1.1"
              width={20}
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <path
                style={{ fill: "#FBBB00" }}
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <path
                style={{ fill: "#518EF8" }}
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <path
                style={{ fill: "#28B446" }}
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <path
                style={{ fill: "#F14336" }}
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                C318.115,0,375.068,22.126,419.404,58.936z"
              />
            </svg>
            Google
          </button>
          <button className="btn apple" type="button">
            <svg
              version="1.1"
              height={20}
              width={20}
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 22.773 22.773"
              style={{ enableBackground: "new 0 0 22.773 22.773" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                  <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                </g>
              </g>
            </svg>
            Apple
          </button>
        </div>
      </StyledForm>
    </AuthLayout>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    text-align: center;
    color: #151717;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .form-subtitle {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    color: #151717;
    font-weight: 600;
    font-size: 14px;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    background-color: #f9fafb;

    &:hover {
      border-color: #c0c0c0;
    }

    &.error {
      border-color: #ef4444;
    }
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background-color: transparent;
    font-size: 14px;
    color: #333;

    &:focus {
      outline: none;
    }
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
    box-shadow: 0 0 0 3px rgba(45, 121, 243, 0.1);
  }

  .error-message {
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
  }

  .terms-group {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 10px 0;

    input {
      accent-color: #2d79f3;
      margin-top: 3px;
      min-width: 16px;
      height: 16px;
      cursor: pointer;
    }

    label {
      font-size: 14px;
      color: #4b5563;
      cursor: pointer;
      user-select: none;
      font-weight: 400;
      text-align: left;
    }
  }

  .terms-link {
    color: #2d79f3;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  .span {
    font-size: 14px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }

  .button-submit {
    margin: 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      background-color: #252727;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &.submitting {
      background-color: #252727;
      cursor: not-allowed;
    }
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: ${spin} 1s ease-in-out infinite;
  }

  .login-link {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    margin: 5px 0;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;

    .divider-line {
      flex: 1;
      height: 1px;
      background-color: #e5e7eb;
    }

    .divider-text {
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  .social-buttons {
    display: flex;
    gap: 15px;
    margin-top: 5px;
  }

  .btn {
    flex: 1;
    margin-top: 0;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    color: #374151;

    &:hover {
      border-color: #d1d5db;
      background-color: #f9fafb;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    padding: 30px 20px;

    .social-buttons {
      flex-direction: column;
    }
  }
`;

export default SignupForm;
