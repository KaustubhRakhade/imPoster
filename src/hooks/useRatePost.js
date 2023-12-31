export default function useRatePost(setData) {
    const ratePost = (timeStamp, rating) => {
        setData((oldData) => {

            const toRate = oldData.filter((p) => p.timeStamp === timeStamp)[0]
            let newData = [...oldData]

            if (rating === 1) {
                newData[newData.indexOf(toRate)].likeCount += 1
                newData[newData.indexOf(toRate)].liked = true;
                newData[newData.indexOf(toRate)].dislikeCount -= newData[newData.indexOf(toRate)].disliked ? 1 : 0
                newData[newData.indexOf(toRate)].disliked = false
            } else if (rating === -1) {
                newData[newData.indexOf(toRate)].dislikeCount += 1
                newData[newData.indexOf(toRate)].disliked = true;
                newData[newData.indexOf(toRate)].likeCount -= newData[newData.indexOf(toRate)].liked ? 1 : 0
                newData[newData.indexOf(toRate)].liked = false
            } else {
                newData[newData.indexOf(toRate)].likeCount -= newData[newData.indexOf(toRate)].liked ? 1 : 0
                newData[newData.indexOf(toRate)].dislikeCount -= newData[newData.indexOf(toRate)].disliked ? 1 : 0
                newData[newData.indexOf(toRate)].liked = false
                newData[newData.indexOf(toRate)].disliked = false
            }

            return newData;
        })
    }
    return ratePost;
}