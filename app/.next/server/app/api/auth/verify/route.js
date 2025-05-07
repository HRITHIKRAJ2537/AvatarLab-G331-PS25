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
exports.id = "app/api/auth/verify/route";
exports.ids = ["app/api/auth/verify/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/verify/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/verify/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ \"(rsc)/./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);\n// import { NextResponse } from \"next/server\";\n// import jwt from \"jsonwebtoken\";\n// import * as dotenv from \"dotenv\";\n// dotenv.config();\n// const SECRET_KEY = process.env.JWT_SECRET;\n// export async function POST(req: Request) {\n//   const { token } = await req.json();\n//   if (!token) {\n//     return NextResponse.json({ error: \"Token is required\" }, { status: 400 });\n//   }\n//   try {\n//     const decoded = jwt.verify(token, SECRET_KEY);\n//     return NextResponse.json({ success: true, message: \"Verified\", user: decoded }, { status: 200 });\n//   } catch (error) {\n//     return NextResponse.json({ error: \"Invalid or expired token\" }, { status: 401 });\n//   }\n// }\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_2__.config();\nconst SECRET_KEY = process.env.JWT_SECRET;\nif (!SECRET_KEY) {\n    throw new Error(\"JWT_SECRET is not defined in environment variables\");\n}\nasync function POST(req) {\n    const authHeader = req.headers.get(\"authorization\");\n    if (!authHeader) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Authorization header is required\"\n        }, {\n            status: 401\n        });\n    }\n    const token = authHeader.split(\" \")[1];\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Token is required\"\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, SECRET_KEY);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Verified\",\n            user: decoded\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Token verification error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Invalid token\"\n        }, {\n            status: 401\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmVyaWZ5L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDhDQUE4QztBQUM5QyxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBRXBDLG1CQUFtQjtBQUNuQiw2Q0FBNkM7QUFFN0MsNkNBQTZDO0FBQzdDLHdDQUF3QztBQUN4QyxrQkFBa0I7QUFDbEIsaUZBQWlGO0FBQ2pGLE1BQU07QUFFTixVQUFVO0FBQ1YscURBQXFEO0FBQ3JELHdHQUF3RztBQUN4RyxzQkFBc0I7QUFDdEIsd0ZBQXdGO0FBQ3hGLE1BQU07QUFDTixJQUFJO0FBUXVDO0FBQ1o7QUFDRTtBQUVqQ0UsMENBQWE7QUFFYixNQUFNRSxhQUFhQyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7QUFFekMsSUFBSSxDQUFDSCxZQUFZO0lBQ2YsTUFBTSxJQUFJSSxNQUFNO0FBQ2xCO0FBRU8sZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxNQUFNQyxhQUFhRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQztJQUVuQyxJQUFJLENBQUNGLFlBQVk7UUFDZixPQUFPWCxxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBbUMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDeEY7SUFFQSxNQUFNQyxRQUFRTixXQUFXTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFFdEMsSUFBSSxDQUFDRCxPQUFPO1FBQ1YsT0FBT2pCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFvQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN6RTtJQUVBLElBQUk7UUFDRixNQUFNRyxVQUFVbEIsMERBQVUsQ0FBQ2dCLE9BQU9iO1FBQ2xDLE9BQU9KLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRU8sU0FBUztZQUFNQyxTQUFTO1lBQVlDLE1BQU1KO1FBQVEsR0FBRztZQUFFSCxRQUFRO1FBQUk7SUFDaEcsRUFBRSxPQUFPRCxPQUFPO1FBQ2RTLFFBQVFULEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLE9BQU9mLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNyRTtBQUNGIiwic291cmNlcyI6WyIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbi8vIGltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuLy8gaW1wb3J0ICogYXMgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcblxuLy8gZG90ZW52LmNvbmZpZygpO1xuLy8gY29uc3QgU0VDUkVUX0tFWSA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuLy8gICBjb25zdCB7IHRva2VuIH0gPSBhd2FpdCByZXEuanNvbigpO1xuLy8gICBpZiAoIXRva2VuKSB7XG4vLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVG9rZW4gaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuLy8gICB9XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgU0VDUkVUX0tFWSk7XG4vLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJWZXJpZmllZFwiLCB1c2VyOiBkZWNvZGVkIH0sIHsgc3RhdHVzOiAyMDAgfSk7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCBvciBleHBpcmVkIHRva2VuXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbi8vICAgfVxuLy8gfVxuXG5cblxuXG5cblxuXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBTRUNSRVRfS0VZID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVDtcblxuaWYgKCFTRUNSRVRfS0VZKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgaXMgbm90IGRlZmluZWQgaW4gZW52aXJvbm1lbnQgdmFyaWFibGVzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzLmdldChcImF1dGhvcml6YXRpb25cIik7XG5cbiAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQXV0aG9yaXphdGlvbiBoZWFkZXIgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyLnNwbGl0KFwiIFwiKVsxXTtcblxuICBpZiAoIXRva2VuKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVG9rZW4gaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgU0VDUkVUX0tFWSBhcyBzdHJpbmcpOyBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIlZlcmlmaWVkXCIsIHVzZXI6IGRlY29kZWQgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiVG9rZW4gdmVyaWZpY2F0aW9uIGVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCB0b2tlblwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJqd3QiLCJkb3RlbnYiLCJjb25maWciLCJTRUNSRVRfS0VZIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJFcnJvciIsIlBPU1QiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInRva2VuIiwic3BsaXQiLCJkZWNvZGVkIiwidmVyaWZ5Iiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJ1c2VyIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/verify/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/verify/route.ts */ \"(rsc)/./app/api/auth/verify/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/verify/route\",\n        pathname: \"/api/auth/verify\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/verify/route\"\n    },\n    resolvedPagePath: \"/home/vvr/PROJECT/AvatarLab-G331-PS25__/app/api/auth/verify/route.ts\",\n    nextConfigOutput,\n    userland: _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnZlcmlmeSUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGdnZyJTJGUFJPSkVDVCUyRkF2YXRhckxhYi1HMzMxLVBTMjVfXyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnZ2ciUyRlBST0pFQ1QlMkZBdmF0YXJMYWItRzMzMS1QUzI1X18maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ29CO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3ZlcmlmeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/dotenv","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();