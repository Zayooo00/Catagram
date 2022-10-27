using catgramAPI.Models;

namespace catgramAPI.Services
{
    public interface ICommentService
    {
        Comment Add(Comment comment);
        List<Comment> GetByPostId(int postId);
        void Delete(int id);
        void DeleteByPostId(int postId);
    }
    public class CommentService : ICommentService
    {
        private DataContext _context;

        public CommentService(DataContext context)
        {
            _context = context;
        }

        public Comment Add(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return comment;
        }
        
        public List<Comment> GetByPostId(int postId)
        {
            var comments = _context.Comments
                    .Where(c => c.PostId == postId).ToList();

            return comments;
        }

        public void Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null)
                throw new Exception("Comment not found.");

            _context.Comments.Remove(comment);
            _context.SaveChanges();
        }
        
        public void DeleteByPostId(int postId)
        {
            var comments = _context.Comments
                    .Where(c => c.PostId == postId).ToList();
 
            if (comments != null)
            {
                foreach (Comment comment in comments)
                {
                    _context.Comments.Remove(comment);
                }

                _context.SaveChanges();
            }
        }
    }
}
