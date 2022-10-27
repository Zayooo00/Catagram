using catgramAPI.Models;
    
    
    
namespace catgramAPI.Services
{
    public interface IProfileService
    {
        List<Profile> GetId(int id);
        Profile Create(Profile profile);
        void Update(Profile profile);
    }
    public class ProfileService : IProfileService
    {
        private DataContext _context;

        public ProfileService(DataContext context)
        {
            _context = context;
        }
        public List<Profile> GetId(int id)
        {
            var profile = _context.Profiles
                    .Where(c => c.UserId == id).ToList();

            return profile;
        }

        public Profile Create(Profile profile)
        {
            if (string.IsNullOrEmpty(profile.Name))
                throw new Exception("Name is empty");

            if (string.IsNullOrEmpty(profile.Description))
                throw new Exception("Description is empty");

            _context.Profiles.Add(profile);
            _context.SaveChanges();

            return profile;
        }
        public void Update(Profile profileUpdate)
        {
            var profile = _context.Profiles.FirstOrDefault(c => c.UserId == profileUpdate.UserId);
            if (profile == null)
            {
                throw new Exception("Profile not found.");
            }

            profile.Name = profileUpdate.Name;
            profile.Lastname = profileUpdate.Lastname;
            profile.Description = profileUpdate.Description;


            _context.Profiles.Update(profile);
            _context.SaveChanges();
        }
    }
}
