namespace catgramAPI.Dtos
{
    public class PostDto
    {
        public IFormFile FormFile { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FileName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

