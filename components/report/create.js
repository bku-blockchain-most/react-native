import database from './database.json';
import _ from 'lodash';
const dataNTC = ()=>{
    return database.categoryInfo.map((item,index)=>{
            return {
                name: item,
                QT: database.boothInfo.reduce((sum,curr)=>{
                    if (index == curr.categoryId) {return sum + curr.statics.care;}
                    return sum;
                },0),
                TD: database.boothInfo.reduce((sum,curr)=>{
                    if (index == curr.categoryId) {return sum + _.sum(_.valuesIn(curr.statics.thanhPhan));}
                    return sum;
                },0),
                TT: database.boothInfo.reduce((sum,curr)=>{
                    if (index == curr.categoryId) {return sum + _.sum(_.valuesIn(curr.statics.feedback));}
                    return sum;
                },0)
            };
        });
};
const countTicket = ()=>{
    return database.user.lenght;
};

export {dataNTC, countTicket};
