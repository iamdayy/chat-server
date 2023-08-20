import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Application } from "express";
import model from "../models";
import configuration from "../services/config";

const { User } = model

const initPassport = (app: Application) => {
    app.use(passport.initialize())
    passport.use(new LocalStrategy(User.authenticate()))
    const opts: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configuration.SECRET,
    }
    passport.use('jwt' ,new JWTStrategy(opts, (jwt_payload, done) => {
        User.findOne({ username: jwt_payload.user }).then((user) => {
            if (user) {
                done(null, user)
            } else {
                done("no user", false)
            }
        }).catch((error) => {
            done(error, false)
        });
    }));
    passport.serializeUser(User.serializeUser() as any);
    passport.deserializeUser(User.deserializeUser());
    
}

export default initPassport;