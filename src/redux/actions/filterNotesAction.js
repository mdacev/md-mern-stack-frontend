
export const type = 'FILTER_NOTES';

const filterNotesAction = (filter) => {

        let filter_notes_res = [];
        //Todo
        if(filter.priority_val === 'Priority' && filter.status_val === ''){
            filter_notes_res = filter.filter_notes; 
        }
        
        //Por prioridad y estado
        if(filter.priority_val !== 'Priority' && filter.status_val !== ''){
            filter_notes_res =  filter.filter_notes.filter((note) => note.priority === filter.priority_val && note.made === (/true/i).test(filter.status_val));
        }
        else{

            //Por prioridad
            if(filter.priority_val !== 'Priority' && filter.status_val === ''){
                filter_notes_res =  filter.filter_notes.filter((note) => note.priority === filter.priority_val);
            }
            else{
                //Por estado
                if(filter.status_val !== '')
                filter_notes_res =  filter.filter_notes.filter((note) => note.made === (/true/i).test(filter.status_val));
            }
        }

        let res = filter_notes_res;
        const PATTERN = new RegExp(filter.title_filter , 'i');
        filter_notes_res = res.filter(function (el) { return el.title.match( PATTERN ) });

        return  (dispatch) => {
            dispatch( { type, payload: filter_notes_res } ) 
        }
        
}


export default filterNotesAction;