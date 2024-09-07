import { useQuery } from "@tanstack/react-query";

const Posts = () => {
    const { data, status, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            return data;
        }
    });

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    if (status === 'error') {
        return <div>Error: {error.message}</div>
    }

    // status === 'success'
    return (
        <div>
            <h1>Posts</h1>
            <div>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {data.map((post: any, index: number) => (
                    <div key={post.id} className="border p-[1rem] my-[1rem]">
                        <h2>{index + 1}. {post.title}</h2>
                        {/* <p>{post.body}</p> */}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Posts;