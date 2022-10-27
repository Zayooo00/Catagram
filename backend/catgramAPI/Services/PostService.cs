using catgramAPI.Models;
using catgramAPI.Dtos;

namespace catgramAPI.Services
{
    public interface IPostService
    {
        Post Add(Post post);
        List<Post> Get();
        Post GetId(int id);
        List<Post> GetByUserId(int id);
        void Update(Post post);
        void Delete(int id);
    }
    public class PostService : IPostService
    {
        private DataContext _context;

        public PostService(DataContext context)
        {
            _context = context;
        }

        public Post Add(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
            return post;
        }
        public List<Post> Get()
        {
            var posts = _context.Posts.OrderByDescending(p => p.Id).ToList();
            return posts;
        }
        public Post GetId(int id)
        {
            return _context.Posts.Find(id);
        }
        public List<Post> GetByUserId(int id)
        {
            var posts = _context.Posts
                    .OrderByDescending(q => q.Id)
                    .Where(c => c.UserId == id).ToList();

            return posts;
        }
        public void Update(Post postUpdate)
        {
            var post = _context.Posts.Find(postUpdate.Id);
            if (post == null)
                throw new Exception("Post not found.");

            post.Title = postUpdate.Title;
            post.Description = postUpdate.Description;

            _context.Posts.Update(post);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {

            var post = _context.Posts.Find(id);
            if (post == null)
                throw new Exception("Post not found.");

            _context.Posts.Remove(post);
            _context.SaveChanges();
        }
    }
}
