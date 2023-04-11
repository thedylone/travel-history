import _tripsJson from "../data/trips.json";
import _specialJson from "../data/special.json";

export interface ISelectedData {
    name: string;
    date: string;
    images: string[];
}

export interface ILocationData {
    name: string;
    lat: number;
    lng: number;
    date?: string;
    type?: "home" | "school" | "work";
    images?: string[];
}

export interface IArcData {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color?: string | string[];
}

export interface ITripsJson {
    [key: number]: {
        locations: ILocationData[];
    };
}

export interface ISpecialJson {
    home?: ILocationData;
    school?: ILocationData;
    work?: ILocationData;
}

export const selectedData: ISelectedData = { name: "", date: "", images: [] };
export const locationsData: ILocationData[] = [];
export const arcsData: IArcData[] = [];
export const specialData: ILocationData[] = [];

export const setSelectedData = (data: Object) => {
    const merge = { ...selectedData, ...data };
    selectedData.name = merge.name;
    selectedData.date = merge.date;
    selectedData.images = merge.images;
};

const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;

const importJson = (tripsJson: ITripsJson) => {
    for (let i = 0; i < Object.keys(tripsJson).length; i++) {
        const trip = tripsJson[i];
        let prevColor = null;
        const len = trip.locations.length;
        for (let j = 0; j < len; j++) {
            const start = trip.locations[j];
            locationsData.push(start);
            if (j === len - 1) {
                break;
            }
            const end = trip.locations[j + 1];
            const startColor = prevColor || randomHsl();
            const endColor = randomHsl();
            const color = [startColor, endColor];
            prevColor = endColor;
            arcsData.push({
                startLat: start.lat,
                startLng: start.lng,
                endLat: end.lat,
                endLng: end.lng,
                color: color,
            });
        }
    }
};
importJson(_tripsJson);

const importSpecialJson = (specialJson: ISpecialJson) => {
    if (specialJson.home) {
        const home = specialJson.home;
        home.type = "home";
        specialData.push(home);
    }
    if (specialJson.school) {
        const school = specialJson.school;
        school.type = "school";
        specialData.push(school);
    }
    if (specialJson.work) {
        const work = specialJson.work;
        work.type = "work";
        specialData.push(work);
    }
};
importSpecialJson(_specialJson);
