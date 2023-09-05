<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Birthday</title>
<link rel="stylesheet" href="./assets/css/birthday.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- bootstrap links -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
    />
</head>
<body>
    <div class="div-container">
      <div class="main-div">
        <div class="content-container">
          <div>
            <img
              class="content-container-logo"
              src="./assets/images/logos/bird-logo.png"
              alt="fresh-nest-logo
            "
            />
          </div>

          <!-- bithday image and input div container -->

          <div class="birthday-image-and-input-div-container">
            <div class="celebration-div">
              <div class="first-ballon-div">
                <img
                  class="first-ballon-div-image"
                  src="./assets/images/Birhday ballons/left-ballon.png"
                  alt="three=-ballons
            "
                />
              </div>

              <div class="cake-div">
                <img
                  class="cake-div-image"
                  src="./assets/images/Birhday ballons/red-cake.png"
                  alt="cake"
                />
              </div>
              <div class="last-ballon-div">
                <img
                  class="last-ballon-div-image"
                  src="./assets/images/Birhday ballons/right-ballon.png"
                  alt="two-ballons"
                />
              </div>
            </div>
            <form action="updateBirthday" method="post" id="birthday-form">
              <div class="birthday-all-input-div-container">
                <div class="birthday-input-div">
                  <label for="date-of-birth">Date of birth *</label>
                  <input type="date" id="birthday" name="dob"required />
                </div>

                <!--  Gender input -->

                <div class="input-label-div">
                  <div class="gender-label-div">
                    <label class="gender-h4">Gender:</label>
                  </div>

                  <div class="gender-selection-div">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="Gender"
                        name="gender"
                        value="Female"
                        required
                      />
                      <label class="form-check-label" for="femaleGender"
                        >Female</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="Gender"
                        name="gender"
                        value="Male"
                      />
                      <label class="form-check-label" for="maleGender"
                        >Male</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="Gender"
                        name="gender"
                        value="Others"
                      />
                      <label class="form-check-label" for="otherGender"
                        >Other</label
                      >
                    </div>
                  </div>
                </div>

                <div class="submit-and-previous-button-div">
                  <i class="bi bi-arrow-left-circle-fill previous-arrow"></i>

                  <button type="submit" class="next-button">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="next-back-div"></div>
      </div>
    </div>

</body>
</html>