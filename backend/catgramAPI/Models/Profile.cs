namespace catgramAPI.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }

    }
}
