export default function useAddPost(setData, userName) {
    return ((newPostContent, isEditing) => {
        setData((oldData) => {

            const toEdit = oldData.filter((p) => p.timeStamp === isEditing)
            
            if (toEdit.length === 0) {
                return [{
                    "user": userName,
                    "content": newPostContent,
                    "likeCount": 0,
                    "dislikeCount": 0,
                    "liked": false,
                    "disliked": false,
                    "timeStamp": Date.now(),
                }, ...oldData]
            }
            
            else {
                let newData = [...oldData]
                newData[newData.indexOf(toEdit[0])].content = newPostContent
                newData[newData.indexOf(toEdit[0])].isEditing = false
                return newData;
            }
        })
    })
}