namespace catgramAPI.Models
{
    public class Follow
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int FollowedUserId { get; set; }
    }
}
