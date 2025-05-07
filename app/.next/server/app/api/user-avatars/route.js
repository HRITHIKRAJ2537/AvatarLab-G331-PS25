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
exports.id = "app/api/user-avatars/route";
exports.ids = ["app/api/user-avatars/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user-avatars/route.ts":
/*!***************************************!*\
  !*** ./app/api/user-avatars/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ \"buffer\");\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(req) {\n    try {\n        const userIdentifier = new URL(req.url).searchParams.get(\"userIdentifier\") || \"\";\n        if (!userIdentifier) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"userIdentifier is required\"\n            }, {\n                status: 400\n            });\n        }\n        const userAvatars = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userAvatar.findMany({\n            where: {\n                userIdentifier\n            },\n            select: {\n                id: true,\n                name: true,\n                gender: true,\n                video: true\n            }\n        });\n        const formattedAvatars = userAvatars.map((avatar)=>({\n                id: avatar.id,\n                name: avatar.name,\n                gender: avatar.gender,\n                video: `data:video/mp4;base64,${buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(avatar.video).toString(\"base64\")}`,\n                type: \"uploaded\"\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(formattedAvatars, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error fetching user avatars:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch user avatars\",\n            details: error instanceof Error ? error.message : String(error)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXItYXZhdGFycy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNUO0FBQ0Y7QUFFekIsZUFBZUcsSUFBSUMsR0FBWTtJQUNwQyxJQUFJO1FBQ0YsTUFBTUMsaUJBQWlCLElBQUlDLElBQUlGLElBQUlHLEdBQUcsRUFBRUMsWUFBWSxDQUFDQyxHQUFHLENBQUMscUJBQXFCO1FBRTlFLElBQUksQ0FBQ0osZ0JBQWdCO1lBQ25CLE9BQU9MLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBNkIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ2xGO1FBRUEsTUFBTUMsY0FBYyxNQUFNWixtREFBTUEsQ0FBQ2EsVUFBVSxDQUFDQyxRQUFRLENBQUM7WUFDbkRDLE9BQU87Z0JBQUVYO1lBQWU7WUFDeEJZLFFBQVE7Z0JBQUVDLElBQUk7Z0JBQU1DLE1BQU07Z0JBQU1DLFFBQVE7Z0JBQU1DLE9BQU87WUFBSztRQUM1RDtRQUVBLE1BQU1DLG1CQUFtQlQsWUFBWVUsR0FBRyxDQUFDLENBQUNDLFNBQThEO2dCQUN0R04sSUFBSU0sT0FBT04sRUFBRTtnQkFDYkMsTUFBTUssT0FBT0wsSUFBSTtnQkFDakJDLFFBQVFJLE9BQU9KLE1BQU07Z0JBQ3JCQyxPQUFPLENBQUMsc0JBQXNCLEVBQUVuQiwwQ0FBTUEsQ0FBQ3VCLElBQUksQ0FBQ0QsT0FBT0gsS0FBSyxFQUFFSyxRQUFRLENBQUMsV0FBVztnQkFDOUVDLE1BQU07WUFDUjtRQUVBLE9BQU8zQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDWSxrQkFBa0I7WUFBRVYsUUFBUTtRQUFJO0lBQzNELEVBQUUsT0FBT0QsT0FBTztRQUNkaUIsUUFBUWpCLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87WUFBZ0NrQixTQUFTbEIsaUJBQWlCbUIsUUFBUW5CLE1BQU1vQixPQUFPLEdBQUdDLE9BQU9yQjtRQUFPLEdBQ3pHO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS91c2VyLWF2YXRhcnMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VySWRlbnRpZmllciA9IG5ldyBVUkwocmVxLnVybCkuc2VhcmNoUGFyYW1zLmdldChcInVzZXJJZGVudGlmaWVyXCIpIHx8IFwiXCI7XG5cbiAgICBpZiAoIXVzZXJJZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJ1c2VySWRlbnRpZmllciBpcyByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckF2YXRhcnMgPSBhd2FpdCBwcmlzbWEudXNlckF2YXRhci5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyB1c2VySWRlbnRpZmllciB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlLCBnZW5kZXI6IHRydWUsIHZpZGVvOiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBdmF0YXJzID0gdXNlckF2YXRhcnMubWFwKChhdmF0YXI6IHsgaWQ6IGFueTsgbmFtZTogYW55OyBnZW5kZXI6IGFueTsgdmlkZW86IGFueTsgfSkgPT4gKHtcbiAgICAgIGlkOiBhdmF0YXIuaWQsXG4gICAgICBuYW1lOiBhdmF0YXIubmFtZSxcbiAgICAgIGdlbmRlcjogYXZhdGFyLmdlbmRlcixcbiAgICAgIHZpZGVvOiBgZGF0YTp2aWRlby9tcDQ7YmFzZTY0LCR7QnVmZmVyLmZyb20oYXZhdGFyLnZpZGVvKS50b1N0cmluZyhcImJhc2U2NFwiKX1gLFxuICAgICAgdHlwZTogXCJ1cGxvYWRlZFwiLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihmb3JtYXR0ZWRBdmF0YXJzLCB7IHN0YXR1czogMjAwIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGF2YXRhcnM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCB1c2VyIGF2YXRhcnNcIiwgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkJ1ZmZlciIsIkdFVCIsInJlcSIsInVzZXJJZGVudGlmaWVyIiwiVVJMIiwidXJsIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlckF2YXRhcnMiLCJ1c2VyQXZhdGFyIiwiZmluZE1hbnkiLCJ3aGVyZSIsInNlbGVjdCIsImlkIiwibmFtZSIsImdlbmRlciIsInZpZGVvIiwiZm9ybWF0dGVkQXZhdGFycyIsIm1hcCIsImF2YXRhciIsImZyb20iLCJ0b1N0cmluZyIsInR5cGUiLCJjb25zb2xlIiwiZGV0YWlscyIsIkVycm9yIiwibWVzc2FnZSIsIlN0cmluZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user-avatars/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM4QjtBQUU5QyxNQUFNQyxTQUFTQyxPQUFPRCxNQUFNLElBQUksSUFBSUQsd0RBQVlBO0FBRWhELElBQUlHLElBQXFDLEVBQUVELE9BQU9ELE1BQU0sR0FBR0E7QUFFM0QsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3Z2ci9QUk9KRUNUL0F2YXRhckxhYi1HMzMxLVBTMjVfXy9saWIvcHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9wcmlzbWEudHNcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5jb25zdCBwcmlzbWEgPSBnbG9iYWwucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-avatars%2Froute&page=%2Fapi%2Fuser-avatars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-avatars%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-avatars%2Froute&page=%2Fapi%2Fuser-avatars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-avatars%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_user_avatars_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user-avatars/route.ts */ \"(rsc)/./app/api/user-avatars/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user-avatars/route\",\n        pathname: \"/api/user-avatars\",\n        filename: \"route\",\n        bundlePath: \"app/api/user-avatars/route\"\n    },\n    resolvedPagePath: \"/home/vvr/PROJECT/AvatarLab-G331-PS25__/app/api/user-avatars/route.ts\",\n    nextConfigOutput,\n    userland: _home_vvr_PROJECT_AvatarLab_G331_PS25_app_api_user_avatars_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyLWF2YXRhcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVzZXItYXZhdGFycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVzZXItYXZhdGFycyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGdnZyJTJGUFJPSkVDVCUyRkF2YXRhckxhYi1HMzMxLVBTMjVfXyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnZ2ciUyRlBST0pFQ1QlMkZBdmF0YXJMYWItRzMzMS1QUzI1X18maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS92dnIvUFJPSkVDVC9BdmF0YXJMYWItRzMzMS1QUzI1X18vYXBwL2FwaS91c2VyLWF2YXRhcnMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXItYXZhdGFycy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXItYXZhdGFyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci1hdmF0YXJzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvdnZyL1BST0pFQ1QvQXZhdGFyTGFiLUczMzEtUFMyNV9fL2FwcC9hcGkvdXNlci1hdmF0YXJzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-avatars%2Froute&page=%2Fapi%2Fuser-avatars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-avatars%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-avatars%2Froute&page=%2Fapi%2Fuser-avatars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-avatars%2Froute.ts&appDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fvvr%2FPROJECT%2FAvatarLab-G331-PS25__&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();