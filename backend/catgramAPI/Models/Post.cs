namespace catgramAPI.Models
{
    public class Post
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string LinkPicture { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

    }
}
