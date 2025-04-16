// PaymentResult.jsx
import React, { useEffect, useState } from "react";
import { paymentCallback } from "../../../services/apiServices";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const PaymentResult = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const searchParams = window.location.search;
        const res = await paymentCallback(searchParams);

        if (res.status === 200) {
          toast.success("Payment success!");
          navigation("/");
        } else {
          toast.error("Payment failed!");
          navigation("/carts");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentResult();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default PaymentResult;
