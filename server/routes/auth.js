const express =
  require("express");
const jwt =
  require("jsonwebtoken");
const { Resend } =
  require("resend");
const User =
  require("../models/User");

const router =
  express.Router();

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

/* SEND OTP */
router.post(
  "/send-otp",
  async (req, res) => {
    try {
      const {
        name,
        email,
        mode,
      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (
        mode ===
          "signup" &&
        existingUser
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "User already exists. Please login.",
          });
      }

      if (
        mode ===
          "login" &&
        !existingUser
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "User not found. Please signup.",
          });
      }

      const otp =
        Math.floor(
          100000 +
            Math.random() *
              900000
        ).toString();

      const otpExpiry =
        new Date(
          Date.now() +
            5 *
              60 *
              1000
        );

      let user;

      if (
        existingUser
      ) {
        user =
          existingUser;

        user.otp = otp;
        user.otpExpiry =
          otpExpiry;

        await user.save();
      } else {
        user =
          await User.create(
            {
              name,
              email,
              otp,
              otpExpiry,
            }
          );
      }

      await resend.emails.send(
        {
          from:
            "Alibaba Clone <onboarding@resend.dev>",
          to: email,
          subject:
            "Your Login OTP",
          html: `
            <div style="font-family:Arial;padding:30px;">
              <h2>Your OTP Code</h2>
              <h1 style="color:#ff6a00;font-size:40px;">
                ${otp}
              </h1>
              <p>
                Valid for 5 minutes.
              </p>
            </div>
          `,
        }
      );

      res.json({
        success:
          true,
        message:
          "OTP sent to your email",
      });
    } catch (err) {
      console.log(
        err
      );

      res.status(500).json(
        {
          success:
            false,
          message:
            "Failed to send OTP",
        }
      );
    }
  }
);

/* VERIFY OTP */
router.post(
  "/verify-otp",
  async (req, res) => {
    try {
      const {
        email,
        otp,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        !user ||
        user.otp !==
          otp ||
        user.otpExpiry <
          new Date()
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Invalid OTP",
          });
      }

      user.otp = null;
      user.otpExpiry =
        null;

      await user.save();

      const token =
        jwt.sign(
          {
            id:
              user._id,
            role:
              user.role,
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        success:
          true,
        token,
        user: {
          _id:
            user._id,
          name:
            user.name,
          email:
            user.email,
          role:
            user.role,
        },
      });
    } catch (err) {
      console.log(
        err
      );

      res.status(500).json(
        {
          success:
            false,
          message:
            "Verification failed",
        }
      );
    }
  }
);

/* GET ALL USERS */
router.get(
  "/users",
  async (
    req,
    res
  ) => {
    try {
      const users =
        await User.find()
          .select(
            "-otp -otpExpiry"
          )
          .sort({
            createdAt:
              -1,
          });

      res.json(
        users
      );
    } catch (err) {
      console.log(
        err
      );

      res.status(500).json(
        {
          message:
            "Cannot fetch users",
        }
      );
    }
  }
);

/* DELETE USER */
router.delete(
  "/users/:id",
  async (
    req,
    res
  ) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted successfully",
      });
    } catch (err) {
      console.log(
        err
      );

      res.status(500).json(
        {
          message:
            "Delete failed",
        }
      );
    }
  }
);

module.exports =
  router;