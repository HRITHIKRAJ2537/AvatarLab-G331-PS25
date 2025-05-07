/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _model_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/model/user */ \"(rsc)/./model/user.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ \"(rsc)/./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cookie */ \"(rsc)/./node_modules/cookie/dist/index.js\");\n// // app/api/auth/login/route.ts\n// import connectMDB from \"@/lib/mongodb\";\n// import User from \"@/model/user\";\n// import { type NextRequest, NextResponse } from \"next/server\";\n// import jwt from \"jsonwebtoken\";\n// import * as dotenv from \"dotenv\";\n// import { compare } from \"bcryptjs\";\n// dotenv.config();\n// const secret = process.env.JWT_SECRET;\n// export async function POST(req: NextRequest) {\n//   await connectMDB();\n//   const { email, password } = await req.json();\n//   console.log(\"Login attempt for:\", email);\n//   try {\n//     const user = await User.findOne({ email });\n//     if (!user) {\n//       console.warn(\"Invalid credentials for:\", email);\n//       return NextResponse.json({ message: \"Invalid Credentials\" }, { status: 401 });\n//     }\n//     const isValid = await compare(password, user.password);\n//     if (!isValid) {\n//       console.warn(\"Invalid credentials for:\", email);\n//       return NextResponse.json({ message: \"Invalid Credentials\" }, { status: 401 });\n//     }\n//     const token = jwt.sign({ email: user.email, userId: user._id }, secret as string, { expiresIn: \"1h\" });\n//     console.log(\"Login successful, token generated for:\", email);\n//     return NextResponse.json({\n//       message: \"Login Successful\",\n//       token,\n//       userId: user._id.toString(), // Add userId to response\n//     });\n//   } catch (error) {\n//     console.error(\"Login Error:\", error);\n//     return NextResponse.json(\n//       { message: \"Server Error\", details: error instanceof Error ? error.message : String(error) },\n//       { status: 500 }\n//     );\n//   }\n// }\n\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_4__.config();\nconst secret = process.env.JWT_SECRET;\nasync function POST(req) {\n    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    const { email, password } = await req.json();\n    console.log(\"Login attempt for:\", email);\n    try {\n        const user = await _model_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n            email\n        });\n        if (!user) {\n            console.warn(\"Invalid credentials for:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                message: \"Invalid Credentials\"\n            }, {\n                status: 401\n            });\n        }\n        const isValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_5__.compare)(password, user.password);\n        if (!isValid) {\n            console.warn(\"Invalid credentials for:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                message: \"Invalid Credentials\"\n            }, {\n                status: 401\n            });\n        }\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            email: user.email,\n            userId: user._id,\n            username: user.username\n        }, secret, {\n            expiresIn: \"1h\"\n        });\n        console.log(\"Login successful, token generated for:\", email);\n        const serializedCookie = (0,cookie__WEBPACK_IMPORTED_MODULE_6__.serialize)(\"token\", token, {\n            httpOnly: false,\n            secure: \"development\" === \"production\",\n            sameSite: \"strict\",\n            path: \"/\",\n            maxAge: 60 * 60\n        });\n        const response = next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            message: \"Login Successful\",\n            token,\n            userId: user._id.toString()\n        });\n        response.headers.set(\"Set-Cookie\", serializedCookie);\n        return response;\n    } catch (error) {\n        console.error(\"Login Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            message: \"Server Error\",\n            details: error instanceof Error ? error.message : String(error)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bEI7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvdnZyL1BST0pFQ1QvQXZhdGFyTGFiLUczMzEtUFMyNV9fL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5cbi8vIC8vIGFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50c1xuLy8gaW1wb3J0IGNvbm5lY3RNREIgZnJvbSBcIkAvbGliL21vbmdvZGJcIjtcbi8vIGltcG9ydCBVc2VyIGZyb20gXCJAL21vZGVsL3VzZXJcIjtcbi8vIGltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuLy8gaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG4vLyBpbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xuLy8gaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gXCJiY3J5cHRqc1wiO1xuXG4vLyBkb3RlbnYuY29uZmlnKCk7XG5cbi8vIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbi8vICAgYXdhaXQgY29ubmVjdE1EQigpO1xuXG4vLyAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBhd2FpdCByZXEuanNvbigpO1xuLy8gICBjb25zb2xlLmxvZyhcIkxvZ2luIGF0dGVtcHQgZm9yOlwiLCBlbWFpbCk7XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XG5cbi8vICAgICBpZiAoIXVzZXIpIHtcbi8vICAgICAgIGNvbnNvbGUud2FybihcIkludmFsaWQgY3JlZGVudGlhbHMgZm9yOlwiLCBlbWFpbCk7XG4vLyAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkludmFsaWQgQ3JlZGVudGlhbHNcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuLy8gICAgIH1cblxuLy8gICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcbi8vICAgICBpZiAoIWlzVmFsaWQpIHtcbi8vICAgICAgIGNvbnNvbGUud2FybihcIkludmFsaWQgY3JlZGVudGlhbHMgZm9yOlwiLCBlbWFpbCk7XG4vLyAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkludmFsaWQgQ3JlZGVudGlhbHNcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuLy8gICAgIH1cblxuLy8gICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBlbWFpbDogdXNlci5lbWFpbCwgdXNlcklkOiB1c2VyLl9pZCB9LCBzZWNyZXQgYXMgc3RyaW5nLCB7IGV4cGlyZXNJbjogXCIxaFwiIH0pO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiTG9naW4gc3VjY2Vzc2Z1bCwgdG9rZW4gZ2VuZXJhdGVkIGZvcjpcIiwgZW1haWwpO1xuXG4vLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbi8vICAgICAgIG1lc3NhZ2U6IFwiTG9naW4gU3VjY2Vzc2Z1bFwiLFxuLy8gICAgICAgdG9rZW4sXG4vLyAgICAgICB1c2VySWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksIC8vIEFkZCB1c2VySWQgdG8gcmVzcG9uc2Vcbi8vICAgICB9KTtcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICBjb25zb2xlLmVycm9yKFwiTG9naW4gRXJyb3I6XCIsIGVycm9yKTtcbi8vICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4vLyAgICAgICB7IG1lc3NhZ2U6IFwiU2VydmVyIEVycm9yXCIsIGRldGFpbHM6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSB9LFxuLy8gICAgICAgeyBzdGF0dXM6IDUwMCB9XG4vLyAgICAgKTtcbi8vICAgfVxuLy8gfVxuXG5cblxuXG5pbXBvcnQgY29ubmVjdE1EQiBmcm9tIFwiQC9saWIvbW9uZ29kYlwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWwvdXNlclwiO1xuaW1wb3J0IHsgdHlwZSBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tIFwiY29va2llXCI7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3Qgc2VjcmV0ID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICBhd2FpdCBjb25uZWN0TURCKCk7XG5cbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gIGNvbnNvbGUubG9nKFwiTG9naW4gYXR0ZW1wdCBmb3I6XCIsIGVtYWlsKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbCB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBjcmVkZW50aWFscyBmb3I6XCIsIGVtYWlsKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBDcmVkZW50aWFsc1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBjcmVkZW50aWFscyBmb3I6XCIsIGVtYWlsKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBDcmVkZW50aWFsc1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGVtYWlsOiB1c2VyLmVtYWlsLCB1c2VySWQ6IHVzZXIuX2lkLCB1c2VybmFtZSA6IHVzZXIudXNlcm5hbWUgfSwgc2VjcmV0IGFzIHN0cmluZywgeyBleHBpcmVzSW46IFwiMWhcIiB9KTtcbiAgICBjb25zb2xlLmxvZyhcIkxvZ2luIHN1Y2Nlc3NmdWwsIHRva2VuIGdlbmVyYXRlZCBmb3I6XCIsIGVtYWlsKTtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRDb29raWUgPSBzZXJpYWxpemUoXCJ0b2tlblwiLCB0b2tlbiwge1xuICAgICAgaHR0cE9ubHk6IGZhbHNlLCAvLyBNdXN0IGJlIGZhbHNlIGZvciBnZXRFbWFpbCB0byByZWFkIGNvb2tpZSBjbGllbnQtc2lkZVxuICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICBzYW1lU2l0ZTogXCJzdHJpY3RcIixcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgbWF4QWdlOiA2MCAqIDYwLCAvLyAxIGhvdXJcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgbWVzc2FnZTogXCJMb2dpbiBTdWNjZXNzZnVsXCIsXG4gICAgICB0b2tlbixcbiAgICAgIHVzZXJJZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgICByZXNwb25zZS5oZWFkZXJzLnNldChcIlNldC1Db29raWVcIiwgc2VyaWFsaXplZENvb2tpZSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkxvZ2luIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiBcIlNlcnZlciBFcnJvclwiLCBkZXRhaWxzOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0iXSwibmFtZXMiOlsiY29ubmVjdE1EQiIsIlVzZXIiLCJOZXh0UmVzcG9uc2UiLCJqd3QiLCJkb3RlbnYiLCJjb21wYXJlIiwic2VyaWFsaXplIiwiY29uZmlnIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJQT1NUIiwicmVxIiwiZW1haWwiLCJwYXNzd29yZCIsImpzb24iLCJjb25zb2xlIiwibG9nIiwidXNlciIsImZpbmRPbmUiLCJ3YXJuIiwibWVzc2FnZSIsInN0YXR1cyIsImlzVmFsaWQiLCJ0b2tlbiIsInNpZ24iLCJ1c2VySWQiLCJfaWQiLCJ1c2VybmFtZSIsImV4cGlyZXNJbiIsInNlcmlhbGl6ZWRDb29raWUiLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwicGF0aCIsIm1heEFnZSIsInJlc3BvbnNlIiwidG9TdHJpbmciLCJoZWFkZXJzIiwic2V0IiwiZXJyb3IiLCJkZXRhaWxzIiwiRXJyb3IiLCJTdHJpbmciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// lib/mongodb.ts\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectMDB() {\n    console.log(\"Attempting to connect to MongoDB with URI:\", MONGODB_URI); // Debug log\n    if (cached.conn) {\n        console.log(\"Using existing MongoDB connection\");\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            console.log(\"MongoDB connected successfully\");\n            return mongoose;\n        }).catch((err)=>{\n            console.error(\"MongoDB connection error:\", err.message);\n            throw err; // Re-throw to handle upstream\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n        return cached.conn;\n    } catch (err) {\n        console.error(\"Failed to resolve MongoDB connection:\", err);\n        throw err; // Ensure the error propagates\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectMDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQkFBaUI7QUFDZTtBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQUVBLElBQUlDLFNBQVNDLE9BQU9OLFFBQVE7QUFFNUIsSUFBSSxDQUFDSyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9OLFFBQVEsR0FBRztRQUFFTyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUN6RDtBQUVBLGVBQWVDO0lBQ2JDLFFBQVFDLEdBQUcsQ0FBQyw4Q0FBOENWLGNBQWMsWUFBWTtJQUVwRixJQUFJSSxPQUFPRSxJQUFJLEVBQUU7UUFDZkcsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBT04sT0FBT0UsSUFBSTtJQUNwQjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ25CLE1BQU1JLE9BQU87WUFDWEMsZ0JBQWdCO1FBQ2xCO1FBRUFSLE9BQU9HLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWFXLE1BQU1HLElBQUksQ0FBQyxDQUFDZjtZQUN6RFUsUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBT1g7UUFDVCxHQUFHZ0IsS0FBSyxDQUFDLENBQUNDO1lBQ1JQLFFBQVFRLEtBQUssQ0FBQyw2QkFBNkJELElBQUlFLE9BQU87WUFDdEQsTUFBTUYsS0FBSyw4QkFBOEI7UUFDM0M7SUFDRjtJQUVBLElBQUk7UUFDRlosT0FBT0UsSUFBSSxHQUFHLE1BQU1GLE9BQU9HLE9BQU87UUFDbEMsT0FBT0gsT0FBT0UsSUFBSTtJQUNwQixFQUFFLE9BQU9VLEtBQUs7UUFDWlAsUUFBUVEsS0FBSyxDQUFDLHlDQUF5Q0Q7UUFDdkQsTUFBTUEsS0FBSyw4QkFBOEI7SUFDM0M7QUFDRjtBQUVBLGlFQUFlUixVQUFVQSxFQUFDIiwic291cmNlcyI6WyIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vbGliL21vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL21vbmdvZGIudHNcbmltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcblxuaWYgKCFNT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZGVmaW5lIHRoZSBNT05HT0RCX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbnNpZGUgLmVudi5sb2NhbFwiKTtcbn1cblxubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RNREIoKSB7XG4gIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byBjb25uZWN0IHRvIE1vbmdvREIgd2l0aCBVUkk6XCIsIE1PTkdPREJfVVJJKTsgLy8gRGVidWcgbG9nXG5cbiAgaWYgKGNhY2hlZC5jb25uKSB7XG4gICAgY29uc29sZS5sb2coXCJVc2luZyBleGlzdGluZyBNb25nb0RCIGNvbm5lY3Rpb25cIik7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9XG5cbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsIC8vIERpc2FibGUgY29tbWFuZCBidWZmZXJpbmcgb24gaW5pdGlhbCBjb25uZWN0aW9uXG4gICAgfTtcblxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ29EQiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgcmV0dXJuIG1vbmdvb3NlO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb25nb0RCIGNvbm5lY3Rpb24gZXJyb3I6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycjsgLy8gUmUtdGhyb3cgdG8gaGFuZGxlIHVwc3RyZWFtXG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgTW9uZ29EQiBjb25uZWN0aW9uOlwiLCBlcnIpO1xuICAgIHRocm93IGVycjsgLy8gRW5zdXJlIHRoZSBlcnJvciBwcm9wYWdhdGVzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdE1EQjsiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiY29ubmVjdE1EQiIsImNvbnNvbGUiLCJsb2ciLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25uZWN0IiwidGhlbiIsImNhdGNoIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./model/user.ts":
/*!***********************!*\
  !*** ./model/user.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    username: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true\n    },\n    password: {\n        type: String,\n        required: true\n    }\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbC91c2VyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUErQjtBQUUvQixNQUFNQyxhQUFhLElBQUlELHdEQUFlLENBQUM7SUFDckNHLFVBQVU7UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3pDQyxPQUFPO1FBQUVILE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUN0Q0UsVUFBVTtRQUFFSixNQUFNQztRQUFRQyxVQUFVO0lBQUs7QUFDM0M7QUFFQSxNQUFNRyxPQUFPVCx3REFBZSxDQUFDUyxJQUFJLElBQUlULHFEQUFjLENBQUMsUUFBUUM7QUFDNUQsaUVBQWVRLElBQUlBLEVBQUEiLCJzb3VyY2VzIjpbIi9ob21lL3Z2ci9QUk9KRUNUL0F2YXRhckxhYi1HMzMxLVBTMjVfXy9tb2RlbC91c2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxuXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIHVzZXJuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG59KVxuXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWwoXCJVc2VyXCIsIFVzZXJTY2hlbWEpXG5leHBvcnQgZGVmYXVsdCBVc2VyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJVc2VyU2NoZW1hIiwiU2NoZW1hIiwidXNlcm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJlbWFpbCIsInBhc3N3b3JkIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./model/user.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/home/vvr/PROJECT/AvatarLab-G331-PS25__/app/api/auth/login/route.ts\",\n    nextConfigOutput,\n    userland: _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGdnZyJTJGUFJPSkVDVCUyRkF2YXRhckxhYi1HMzMxLVBTMjVfXyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnZ2ciUyRlBST0pFQ1QlMkZBdmF0YXJMYWItRzMzMS1QUzI1X18maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ21CO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3Z2ci9QUk9KRUNUL0F2YXRhckxhYi1HMzMxLVBTMjVfXy9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/cookie","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/dotenv","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();