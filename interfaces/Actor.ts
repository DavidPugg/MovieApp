export interface Actor {
    id: Number;
    profile_path: String;
    name: String;
    character: String;
}

export interface ActorMovie {
    id: Number;
    poster_path: String;
    name?: String;
    title?: String;
}
