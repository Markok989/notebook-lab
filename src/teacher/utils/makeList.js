/*
function filterList with parameters list and id,
filterList has value of list wich one is filtered with parameter item, then,
return item.course_id when has the same value as id,
on the end return filterList
*/
export function filterList(list, id) {

    var filterList = list.filter((item) => {

        return item.course_id == id;

    });

    return filterList;

}