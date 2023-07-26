export default function useDeletePost(setData) {
    return ((timeStamp) => {
        setData((oldData) => {
            let newData = [...oldData]
            newData = newData.filter((post) => {
                return post.timeStamp !== timeStamp
            })
            return newData
        })
    })
}