"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dao = void 0;
// imports
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class KmDAO {
    saveData(signo, genero, edad, sueldo, parejas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query(`INSERT INTO datosu (Mes, Ego, Impulsivo, Dinero, Razon)VALUES (${signo}, ${genero}, ${edad}, ${sueldo}, ${parejas})`);
                }));
                console.log(result.protocol41);
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    getData(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query(`SELECT ${x}, ${y} FROM datosu`);
                }));
                console.log(result);
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    countData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query(`SELECT COUNT(*) as count FROM datosu`);
                }));
                console.log(result);
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }

}
exports.dao = new KmDAO();
