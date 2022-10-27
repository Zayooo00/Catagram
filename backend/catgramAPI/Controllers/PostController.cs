using Microsoft.AspNetCore.Mvc;
using catgramAPI.Dtos;
using catgramAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace catgramAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private IPostService _postService;
        private ICommentService _commentService;
        public PostController(IPostService postService, ICommentService commentService)
        {
            _postService = postService;
            _commentService = commentService;

        }


        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postService.Get();
            return Ok(posts);
        }

        [HttpGet("User/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var posts = _postService.GetByUserId(id);
            if (posts == null)
                return BadRequest();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetId(int id)
        {
            var post = _postService.GetId(id);
            if (post == null)
                return BadRequest();
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Add([FromForm] PostDto postDto)
        {
            if (string.IsNullOrEmpty(postDto.Title) || string.IsNullOrEmpty(postDto.Description))
                return BadRequest();

            string path = Path.Combine(Directory.GetCurrentDirectory(), "uploads", postDto.FileName);
            path = Regex.Replace(path, @"\\", "/");
            using Stream stream = new FileStream(path, FileMode.Create);
            {
                postDto.FormFile.CopyTo(stream);
            }
            Post post = new Post()
            {
                UserId = postDto.UserId,
                UserName = postDto.UserName,
                Title = postDto.Title,
                Description = postDto.Description,
                LinkPicture = path
            };

            _postService.Add(post);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdatePostDto updatePostDto)
        {
            var post = _postService.GetId(id);
            if (post == null)
                return BadRequest();

            var updatePost = new Post
            {
                Id = id,
                UserId = post.UserId,
                UserName = post.UserName,
                LinkPicture = post.LinkPicture,
                Title = updatePostDto.Title,
                Description = updatePostDto.Description
            };

            try
            {
                _postService.Update(updatePost);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _commentService.DeleteByPostId(id);
                _postService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{postId}/comment/add")]
        public IActionResult CommentAdd(int postId, CommentDto commentDto)
        {
            if (string.IsNullOrEmpty(commentDto.Com))
                return BadRequest();

            Comment comment = new Comment()
            {
                PostId = postId,
                Com = commentDto.Com
            };

            return Ok(_commentService.Add(comment));
        }

        [HttpGet("{postId}/comment/")]
        public IActionResult CommentGet(int postId)
        {
            var comments = _commentService.GetByPostId(postId);
            return Ok(comments);
        }

        [HttpDelete("{postId}/comment/{id}")]
        public IActionResult CommentDeleteId(int id)
        {
            try
            {
                _commentService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}